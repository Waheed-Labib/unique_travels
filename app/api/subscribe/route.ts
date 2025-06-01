import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import { resend } from "../../../lib/resend";
import SubscriberModel from "../../../models/subscriber";

export async function POST(request: NextRequest) {
    await dbConnect();

    try {

        const body = await request.json();
        const { email } = body;

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email || !regex.test(email)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid Email Address'
                },
                {
                    status: 400
                }
            )
        }

        const alreadyExists = await SubscriberModel.findOne({ email });

        if (alreadyExists) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Subscriber already exists'
                },
                {
                    status: 400
                }
            )
        }

        const subscriber = await SubscriberModel.create({ email, isVerified: false });

        if (subscriber) {

            await resend.emails.send({
                from: 'RH Travels <onboarding@resend.dev>',
                to: email,
                subject: 'Please verify your email',
                html: `<p>Thanks for subscribing! Please verify your email by clicking the link below:</p>
                   <p><a href="http://localhost:3000/api/verify?email=${encodeURIComponent(email)}">Verify Email</a></p>`
            });

            return NextResponse.json(
                {
                    success: true,
                    message: 'Subscriber added successfully',
                    data: subscriber
                },
                {
                    status: 200
                }
            )
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Subscription Failed'
                },
                {
                    status: 400
                }
            )
        }

    } catch (error) {
        console.error('Subscription Failed: ', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Subscription Failed'
            },
            {
                status: 500
            }
        )
    }
}