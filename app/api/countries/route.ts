import { ApiError } from "../../../lib/apiError";
import { ApiSuccess } from "../../../lib/apiSuccess";
import dbConnect from "../../../lib/dbConnect";
import CountryModel from "../../../models/country";

export async function GET(request: Request) {
    await dbConnect();

    try {

        const { searchParams } = new URL(request.url);
        const country = searchParams.get('country');

        let result;

        if (country) {
            result = await CountryModel.findOne({
                name: new RegExp(`^${country}$`, 'i') // 'i' flag makes it case-insensitive
            })
        } else {
            result = await CountryModel.find();
        }

        if (result) {
            return ApiSuccess("Getting countries Successful", result, 200)
        } else {
            return ApiError("Getting countries Failed", 500)
        }

    } catch (error) {
        console.error('Error getting countries: ', error);

        return ApiError("Failed to get countries", 500)
    }
}