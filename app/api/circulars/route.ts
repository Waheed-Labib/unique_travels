import { ApiError } from "../../../lib/apiError";
import { ApiSuccess } from "../../../lib/apiSuccess";
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

            const subscribers = await SubscriberModel.find({});
            const emails = subscribers.map(sub => sub.email);

            await Promise.all(
                emails.map(email => {
                    resend.emails.send({
                        from: 'RH Travels <onboarding@resend.dev>',
                        to: email,
                        subject: `New Job Circular from ${region}`,
                        html: `<h2>New Job Circular from ${region} !</h2>
                               
                                <img src="${image}" alt="new circular" width="400" style="border-radius: 8px; margin: 12px 0;"  />
                        
                                <p>For more, visit : </p>
                        
                                <a href="https://rh-travels.org/work-abroad/${region}" style="
                                    display: inline-block;
                                    background-color: #1d4ed8;
                                    color: white;
                                    padding: 10px 20px;
                                    border-radius: 6px;
                                    text-decoration: none;
                                    font-weight: bold;
                                    margin-top: 10px;
                               ">🌍 https://rh-travels.org/work-abroad/${region}</a>

                               <p style="margin-top: 20px; font-size: 12px; color: gray;">
                                    You're receiving this email because you subscribed to RH Travels.
                                </p>
                               `
                    })
                })
            )

            return Response.json(ApiSuccess('New Circular Added and Emails sent', newCircular, 200));
        } else {
            return Response.json(ApiError('New Circular not added', 400));
        }

    } catch (error) {
        console.error('Adding circular failed: ', error);

        return Response.json(ApiError('Failed to add circular', 500));
    }
}

export async function DELETE(request: Request) {
    await dbConnect();

    try {

        const body = await request.json();
        const { _id } = body;

        const deletedCircular = await CircularModel.deleteOne({ _id })

        if (deletedCircular) {
            return Response.json(ApiSuccess('Circular Deleted Successfully', {}, 200));
        } else {
            return Response.json(ApiError('Circular was not deleted', 400));
        }

    } catch (error) {
        console.error('Deleting circular failed: ', error);

        return Response.json(ApiError('Failed to delete circular', 500));
    }
}