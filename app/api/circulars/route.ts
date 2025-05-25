import { ApiError } from "../../../lib/apiError";
import { ApiSuccess } from "../../../lib/apiSuccess";
import dbConnect from "../../../lib/dbConnect";
import CircularModel from "../../../models/circular";

export async function GET(request: Request) {
    await dbConnect();

    try {

        const { searchParams } = new URL(request.url);
        const region = searchParams.get('region');

        let circulars;

        if (region) {
            circulars = await CircularModel.find({ region })
        } else {
            circulars = await CircularModel.find();
        }

        if (circulars) {
            return Response.json(
                ApiSuccess("Getting Circulars Successful", circulars, 200)
            )

        } else {
            return Response.json(
                ApiError("Getting Circulars Failed", 500)
            )

        }

    } catch (error) {
        console.error('Error getting circulars: ', error);

        return Response.json(
            ApiError("Failed to get circulars", 500)
        )
    }
}