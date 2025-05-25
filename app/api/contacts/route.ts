import { ApiError } from "../../../lib/apiError";
import { ApiSuccess } from "../../../lib/apiSuccess";
import dbConnect from "../../../lib/dbConnect";
import ContactModel from "../../../models/contact";

export async function GET() {
    await dbConnect();

    try {

        const contacts = await ContactModel.find();

        if (contacts) {
            return Response.json(ApiSuccess("Getting contacts Successful", contacts[0], 200))
        } else {
            return ApiError('Getting contacts failed', 500)
        }

    } catch (error) {
        console.error('Error getting contacts: ', error);

        return ApiError('Failed to get contacts', 500)
    }
}