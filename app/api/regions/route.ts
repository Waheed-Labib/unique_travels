import { ApiError } from "../../../lib/apiError";
import { ApiSuccess } from "../../../lib/apiSuccess";
import dbConnect from "../../../lib/dbConnect";
import RegionModel from "../../../models/region";

export async function GET(request: Request) {
    await dbConnect();

    try {

        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');

        let result;

        if (name) {
            result = await RegionModel.findOne({ name })
        } else {
            result = await RegionModel.find();
        }

        if (result) {
            return Response.json(ApiSuccess("Getting Regions Successful", result, 200))
        } else {
            return Response.json(ApiError('Getting Regions Failed', 500))
        }

    } catch (error) {
        console.error('Error getting regions: ', error);

        return Response.json(ApiError('Failed to get regions', 500))
    }
}