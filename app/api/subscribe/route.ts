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
            throw new ApiError(400, 'Invalid Email Address');
        }

        const alreadyExists = await SubscriberModel.findOne({ email });

        if (alreadyExists) {
            throw new ApiError(400, 'Subscriber already exists');
        }

        const subscriber = await SubscriberModel.create({ email });

        if (subscriber) {
            return Response.json(
                ApiSuccess('Subscriber Added Successfully', subscriber, 200)
            )
        } else {
            throw new ApiError(500, 'Subscription Failed')
        }

    } catch (error) {
        console.error('Subscription Failed: ', error);

        throw new ApiError(500, "Subscription Failed");
    }
}