import { ApiError } from "../../../lib/apiError";
import { ApiSuccess } from "../../../lib/apiSuccess";
import dbConnect from "../../../lib/dbConnect";
import PackageModel from "../../../models/package";

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
            return ApiSuccess("Getting Packages Successful", packages, 200)
        } else {
            return ApiError("Getting Packages Failed", 500)
        }


    } catch (error) {
        console.error('Error getting packages: ', error);

        return ApiError("Failed to get packages", 500)
    }
}