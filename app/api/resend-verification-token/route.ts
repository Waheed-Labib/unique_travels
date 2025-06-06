import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import { resend } from "../../../lib/resend";
import SubscriberModel from "../../../models/subscriber";
import crypto from "crypto";


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

        const subscriber = await SubscriberModel.findOne({ email });

        if (!subscriber) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Subscriber does not exist'
                },
                {
                    status: 400
                }
            )
        }

        const redirectWithEmail = (path: string) => {
            const url = new URL(path, request.url);
            url.searchParams.set('email', subscriber.email);
            return NextResponse.redirect(url);
        };

        if (subscriber.isVerified) {
            return redirectWithEmail('/verification/already-verified');
        }

        const verificationToken = crypto.randomBytes(32).toString("hex");
        const verificationTokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

        subscriber.verificationToken = verificationToken;
        subscriber.verificationTokenExpiry = verificationTokenExpiry;

        await subscriber.save();

        const verifyUrl = `http://localhost:3000/api/verify?token=${verificationToken}`;

        await resend.emails.send({
            from: 'RH Travels <onboarding@resend.dev>',
            to: email,
            subject: 'Please verify your email',
            html: `<p>Thanks for subscribing! Please verify your email by clicking the link below:</p>
            <p><a href="${verifyUrl}">Verify Email</a></p>`
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Verification token sent to Email. Please check your email.'
            },
            {
                status: 200
            }
        )


    } catch (error) {
        console.error('Sending Verification Token Failed: ', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Sending Verification Token Failed'
            },
            {
                status: 500
            }
        )
    }
}