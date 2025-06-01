import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import { resend } from "../../../lib/resend";
import CircularModel from "../../../models/circular";
import SubscriberModel from "../../../models/subscriber";

export async function GET(request: Request) {
    await dbConnect();

    try {

        const { searchParams } = new URL(request.url);
        const region = searchParams.get('region');

        let circulars;

        if (region) {
            circulars = await CircularModel.find({ region: new RegExp(`^${region}$`, 'i') }).sort({ createdAt: -1 });
        } else {
            circulars = await CircularModel.find().sort({ createdAt: -1 });
        }

        if (circulars) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Getting Circulars Successful",
                    data: circulars
                },
                { status: 200 }
            );

        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Getting Circulars Failed"
                },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error('Error getting circulars: ', error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to get circulars"
            },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    await dbConnect();

    try {

        const body = await request.json();
        const { region, image } = body;

        const newCircular = await CircularModel.create({ region, image })

        if (newCircular) {

            const subscribers = await SubscriberModel.find({});
            const verifiedEmails = subscribers
                .filter(sub => sub.isVerified)
                .map(sub => sub.email);

            await Promise.all(
                verifiedEmails.map(email => {
                    resend.emails.send({
                        from: 'RH Travels <onboarding@resend.dev>',
                        to: email,
                        subject: `New Job Circular from ${region}`,
                        html: `<h2>New Job Circular from ${region} !</h2>
                               
                                <img src="${image}" alt="new circular" width="400" style="border-radius: 8px; margin: 12px 0;"  />
                        
                                <p>For more, visit : </p>
                        
                                <a href="https://rh-travels.org/work-abroad/${region}" style="
                               ">🌍 https://rh-travels.org/work-abroad/${region}</a>

                               <p style="margin-top: 20px; font-size: 12px; color: gray;">
                                    You're receiving this email because you subscribed to RH Travels.
                                </p>
                               `
                    })
                })
            )

            return NextResponse.json(
                {
                    success: true,
                    message: "New Circular added and Emails sent to the verified subscribers",
                    data: newCircular
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "New Circular not added"
                },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error('Adding circular failed: ', error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to add circular"
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    await dbConnect();

    try {

        const body = await request.json();
        const { _id } = body;

        const deletedCircular = await CircularModel.deleteOne({ _id })

        if (deletedCircular) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Circular Deleted Successfully"
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Circular was not deleted"
                },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error('Deleting circular failed: ', error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete circular"
            },
            { status: 500 }
        );
    }
}