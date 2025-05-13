import { ApiError } from "../../../lib/apiError";
import { ApiSuccess } from "../../../lib/apiSuccess";
import dbConnect from "../../../lib/dbConnect";
import RegionModel from "../../../models/region";

export async function GET(request: Request) {
    await dbConnect();

    try {

        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');

        let regions;

        if (name) {
            regions = await RegionModel.find({ name })
        } else {
            regions = await RegionModel.find();
        }

        if (regions) {
            return ApiSuccess("Getting Regions Successful", regions, 200)
        } else {
            return ApiError("Getting Regions Failed", 500)
        }

    } catch (error) {
        console.error('Error getting regions: ', error);

        return ApiError("Failed to get regions", 500)
    }
}