import { ApiError } from "../../../lib/apiError";
import { ApiSuccess } from "../../../lib/apiSuccess";
import dbConnect from "../../../lib/dbConnect";
import SubscriberModel from "../../../models/subscriber";

export async function POST(request: Request) {
    await dbConnect();

    try {

        const body = await request.json();
        const { email } = body;

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email || !regex.test(email)) {
            return ApiError('Invalid Email Address', 400);
        }

        const alreadyExists = await SubscriberModel.findOne({ email });

        if (alreadyExists) {
            return ApiError('Subscriber already exists', 400);
        }

        const subscriber = await SubscriberModel.create({ email });

        if (subscriber) {
            return Response.json(
                ApiSuccess('Subscriber Added Successfully', subscriber, 200)
            )
        } else {
            return Response.json(
                ApiError('Subscription Failed', 500)
            )
        }

    } catch (error) {
        console.error('Subscription Failed: ', error);

        return Response.json(
            ApiError("Subscription Failed", 500)
        )
    }
}