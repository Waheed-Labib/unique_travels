import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import { resend } from "../../../lib/resend";
import PackageModel from "../../../models/package";
import SubscriberModel from "../../../models/subscriber";

export async function GET(request: NextRequest) {
    await dbConnect();

    try {

        const { searchParams } = new URL(request.url);
        const country = searchParams.get('country');
        const type = searchParams.get('type');
        const code = searchParams.get('code');

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
                }
                else if (code) {
                    packages = await PackageModel.findOne({ code });
                }
                else {
                    packages = await PackageModel.find({ isFeatured: false })
                }
            } else {
                if (limit) {
                    packages = await PackageModel.find().limit(limit);
                } else if (code) {
                    packages = await PackageModel.findOne({ code });
                }
                else {
                    packages = await PackageModel.find();
                }
            }
        }

        // console.log('packages', packages);

        if (packages) {
            return NextResponse.json(
                {
                    success: true,
                    message: 'Getting packages successful',
                    data: packages
                },
                {
                    status: 200
                })
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Getting packages failed'
                },
                {
                    status: 400
                })
        }


    } catch (error) {
        console.error('Error getting packages: ', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to get packages'
            },
            {
                status: 500
            })
    }
}

export async function POST(request: NextRequest) {
    await dbConnect();

    try {

        const body = await request.json();
        const { countries, details, code } = body;

        if (!countries) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Countries is required'
                },
                {
                    status: 400
                }
            )
        }

        if (!details) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Details is required'
                },
                {
                    status: 400
                }
            )
        }

        if (!code) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Code is required'
                },
                {
                    status: 400
                }
            )
        }

        const cleanedCountries = countries.filter((str: string) => str !== "")

        const newPackage = await PackageModel.create({ countries: cleanedCountries, details, isFeatured: false, code });

        if (newPackage) {
            const subscribers = await SubscriberModel.find({});
            const verifiedEmails = subscribers
                .filter(sub => sub.isVerified)
                .map(sub => sub.email);;

            const countriesInString = countries.join(', ');

            await Promise.all(
                verifiedEmails.map(email => {
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

            return NextResponse.json(
                {
                    success: true,
                    message: 'Package added successfully and emails sent to the subscribers'
                },
                {
                    status: 200
                }
            )
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Package was not added'
                },
                {
                    status: 400
                }
            )
        }
    } catch (error) {
        console.error('Adding Package Failed', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to add package'
            },
            {
                status: 500
            }
        )
    }
}

export async function PATCH(req: NextRequest) {

    await dbConnect();

    try {

        const body = await req.json();
        const { _id, countries, details, isFeatured } = body;

        if (!_id) {
            return NextResponse.json(
                {
                    success: false,
                    message: '_id is not provided in the request'
                },
                {
                    status: 400
                }
            )
        }

        const pkg = await PackageModel.findById(_id);

        if (!pkg) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Package not found'
                },
                {
                    status: 400
                }
            )
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

        return NextResponse.json(
            {
                success: true,
                message: 'Package updated successfully',
                data: pkg
            },
            {
                status: 400
            }
        )

    } catch (error) {

        console.error('Error updating package', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to update package'
            },
            {
                status: 500
            }
        )

    }
}

export async function DELETE(request: Request) {
    await dbConnect();

    try {
        const body = await request.json();
        const { code } = body;

        if (!code) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'code not found'
                },
                {
                    status: 400
                }
            )
        }

        const deletedPackage = await PackageModel.deleteOne({ code: parseInt(code) });

        if (deletedPackage) {
            return NextResponse.json(
                {
                    success: true,
                    message: 'Package deleted successfully'
                },
                {
                    status: 200
                }
            )
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Package was not deleted'
                },
                {
                    status: 400
                }
            )
        }

    } catch (error) {

        console.error('Error deleting package', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to delete package'
            },
            {
                status: 500
            }
        );

    }
}


