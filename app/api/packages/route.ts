import { ApiError } from "../../../lib/apiError";
import { ApiSuccess } from "../../../lib/apiSuccess";
import dbConnect from "../../../lib/dbConnect";
import { resend } from "../../../lib/resend";
import PackageModel from "../../../models/package";
import SubscriberModel from "../../../models/subscriber";

export async function GET(request: Request) {
    await dbConnect();

    try {

        const { searchParams } = new URL(request.url);
        const country = searchParams.get('country');
        const type = searchParams.get('type');

        const limitParam = searchParams.get('limit');
        const limit = limitParam ? parseInt(limitParam, 10) : undefined;

        let packages;

        if (country) {
            if (limit) {
                packages = await PackageModel.find({ countries: country }).limit(limit);
            } else {
                packages = await PackageModel.find({ countries: country })
            }
        } else {
            if (type === 'featured') {
                if (limit) {
                    packages = await PackageModel.find({ isFeatured: true }).limit(limit);
                } else {
                    packages = await PackageModel.find({ isFeatured: true })
                }
            } else if (type === 'unfeatured') {
                if (limit) {
                    packages = await PackageModel.find({ isFeatured: false }).limit(limit);
                } else {
                    packages = await PackageModel.find({ isFeatured: false })
                }
            } else {
                if (limit) {
                    packages = await PackageModel.find().limit(limit);
                } else {
                    packages = await PackageModel.find();
                }
            }
        }

        // console.log('packages', packages);

        if (packages) {
            return Response.json(ApiSuccess("Getting Packages Successful", packages, 200))
        } else {
            return Response.json(ApiError('Getting Packages failed', 500))
        }


    } catch (error) {
        console.error('Error getting packages: ', error);

        return Response.json(ApiError('Failed to get packages', 500))
    }
}

export async function POST(request: Request) {
    await dbConnect();

    try {

        const body = await request.json();
        const { countries, details, code } = body;

        if (!countries) {
            return Response.json(ApiError('Countries is required', 400))
        }

        if (!details) {
            return Response.json(ApiError('Details is required', 400))
        }

        if (!code) {
            return Response.json(ApiError('Code is required', 400))
        }

        const newPackage = await PackageModel.create({ countries, details, isFeatured: false, code });

        if (newPackage) {
            const subscribers = await SubscriberModel.find({});
            const emails = subscribers.map(sub => sub.email);

            const countriesInString = countries.join(', ');

            await Promise.all(
                emails.map(email => {
                    resend.emails.send({
                        from: 'RH Travels <onboarding@resend.dev>',
                        to: email,
                        subject: `New Tour Package for ${countriesInString}`,
                        html: `<h2>New Tour Package is Available !</h2>
                                    
                                <p>A new tour package is available for these countries: ${countriesInString}. For details, visit : </p>
                                    
                                <a href="https://rh-travels.org/packages" style="
                                ">🌍 https://rh-travels.org/packages</a>
            
                                           <p style="margin-top: 20px; font-size: 12px; color: gray;">
                                                You're receiving this email because you subscribed to RH Travels.
                                            </p>
                                           `
                    })
                })
            )

            return Response.json(ApiSuccess('Package added successfully and Emails sent', newPackage, 200))
        } else {
            return Response.json(ApiError('Package was not added', 400))
        }
    } catch (error) {
        console.error('Adding Package Failed', error);
        return Response.json(ApiError('Failed to add Package', 500))
    }
}

export async function PATCH(req: Request) {

    await dbConnect();

    try {

        const body = await req.json();
        const { _id, countries, details, isFeatured } = body;

        if (!_id) {
            return Response.json(ApiError('_id not found', 400));
        }

        const pkg = await PackageModel.findById(_id);

        if (!pkg) {
            return Response.json(ApiError('Package Not Found', 400))
        }

        if (countries) {
            pkg.countries = countries
        }

        if (details) {
            pkg.details = details
        }

        if (isFeatured) {
            pkg.isFeatured = isFeatured
        }

        await pkg.save();

        return Response.json(ApiSuccess('Package updated successfully', pkg, 200));

    } catch (error) {

        console.error('Error updating package', error);
        return Response.json(ApiError('Failed to update package', 500));

    }
}

export async function DELETE(request: Request) {
    await dbConnect();

    try {
        const body = await request.json();
        const { _id } = body;

        if (!_id) {
            return Response.json(ApiError('_id not found', 400));
        }

        const deletedPackage = await PackageModel.deleteOne({ _id });

        if (deletedPackage) {
            return Response.json(ApiSuccess('Package Deleted Successfully', {}, 200));
        } else {
            return Response.json(ApiError('Package was not deleted', 400));
        }

    } catch (error) {

        console.error('Error deleting package', error);
        return Response.json(ApiError('Failed to delete package', 500));

    }
}


