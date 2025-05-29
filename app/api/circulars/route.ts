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
            return Response.json(ApiSuccess("Getting Circulars Successful", circulars, 200))

        } else {

            return ApiError('Getting Circulars Failed', 500)
        }

    } catch (error) {
        console.error('Error getting circulars: ', error);

        return ApiError('Failed to get circulars', 500)
    }
}

export async function POST(request: Request) {
    await dbConnect();

    try {

        const body = await request.json();
        const { region, image } = body;

        const newCircular = await CircularModel.create({ region, image })

        if (newCircular) {
            return Response.json(ApiSuccess('New Circular Added', newCircular, 200));
        } else {
            return ApiError('New Circular not added', 400);
        }

    } catch (error) {
        console.error('Adding circular failed: ', error);

        return ApiError('Failed to add circular', 500)
    }
}