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
        // const limit = searchParams.get('limit');

        console.log(country)

        let packages;

        if (country) {
            packages = await PackageModel.find({ countries: country });
        } else {
            if (type === 'featured') {
                packages = await PackageModel.find({ isFeatured: true });
            } else if (type === 'unfeatured') {
                packages = await PackageModel.find({ isFeatured: false });
            } else {
                packages = await PackageModel.find();
            }
        }

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