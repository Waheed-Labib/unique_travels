import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import SubscriberModel from '../../../models/subscriber';

export async function GET(req: NextRequest) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json(
            {
                success: false,
                message: "Email was not sent via request"
            },
            {
                status: 400
            }
        )
    }

    try {
        const subscriber = await SubscriberModel.findOne({ email });

        if (!subscriber) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Subscriber not found"
                },
                {
                    status: 400
                }
            )
        }

        if (subscriber.isVerified) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Subscriber already verified"
                },
                {
                    status: 400
                }
            )
        }

        subscriber.isVerified = true;
        await subscriber.save();

        return NextResponse.json(
            {
                success: true,
                message: "Verification successful",
                data: subscriber
            },
            {
                status: 200
            }
        )

    } catch (error) {
        console.error('Verification Error:', error);
        return NextResponse.json(
            {
                success: false,
                message: "Verification failed"
            },
            {
                status: 400
            }
        )
    }
}
