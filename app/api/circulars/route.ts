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
        const { region, image, fileId } = body;

        const circulars = await CircularModel.find({ region: new RegExp(`^${region}$`, 'i') });


        if (circulars.length > 99) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Number of circulars for this region has exceeded the limit of 100. Please delete some circulars before adding a new one."
                },
                { status: 400 }
            );
        }

        if (!region || !image || !fileId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All required data not provided"
                },
                { status: 400 }
            );
        }

        const newCircular = await CircularModel.create({ region, image, fileId })

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
        const { _id, region, fileId } = body;

        if (!_id && !region) {
            return NextResponse.json(
                {
                    success: false,
                    message: "_id or region not provided"
                },
                { status: 400 }
            )
        }

        if (!fileId) {
            return NextResponse.json(
                {
                    success: false,
                    message: " fileId not provided"
                },
                { status: 400 }
            )
        }

        let deletedCircular;

        if (_id) {

            const imgKitResponse = await fetch(`https://api.imagekit.io/v1/files/${fileId}`, {
                method: "DELETE",
                headers: {
                    Authorization:
                        "Basic " +
                        Buffer.from(process.env.IMAGEKIT_PRIVATE_KEY + ":").toString("base64"),
                },
            });

            if (!imgKitResponse.ok) {
                const err = await imgKitResponse.text();
                return NextResponse.json(
                    {
                        success: false,
                        message: "Failed to delete image from ImageKit: " + err
                    },
                    { status: 500 }
                );
            }

            deletedCircular = await CircularModel.deleteOne({ _id });
        }

        if (region) {

            const circulars = await CircularModel.find({ region: new RegExp(`^${region}$`, 'i') });

            for (const circular of circulars) {
                const imgKitResponse = await fetch(`https://api.imagekit.io/v1/files/${circular.fileId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization:
                            "Basic " +
                            Buffer.from(process.env.IMAGEKIT_PRIVATE_KEY + ":").toString("base64"),
                    },
                });
                if (!imgKitResponse.ok) {
                    const err = await imgKitResponse.text();
                    return NextResponse.json(
                        {
                            success: false,
                            message: "Failed to delete image from ImageKit: " + err
                        },
                        { status: 500 }
                    );
                }
            }
            deletedCircular = await CircularModel.deleteMany({ region: new RegExp(`^${region}$`, 'i') });
        }

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