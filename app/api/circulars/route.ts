import { ApiError } from "../../../lib/apiError";
import { ApiSuccess } from "../../../lib/apiSuccess";
import dbConnect from "../../../lib/dbConnect";
import CircularModel from "../../../models/circular";

export async function GET() {
    await dbConnect();

    try {

        const circulars = await CircularModel.find({});

        if (circulars) {
            return ApiSuccess("Getting Circulars Successful", circulars, 200)
        } else {
            return ApiError("Getting Circulars Failed", 500)
        }

    } catch (error) {
        console.error('Error getting circulars: ', error);

        return ApiError("Failed to get circulars", 500)
    }
}