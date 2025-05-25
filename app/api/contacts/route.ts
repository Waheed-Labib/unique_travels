import { ApiError } from "../../../lib/apiError";
import { ApiSuccess } from "../../../lib/apiSuccess";
import dbConnect from "../../../lib/dbConnect";
import ContactModel from "../../../models/contact";

export async function GET() {
    await dbConnect();

    try {

        const contacts = await ContactModel.find();

        if (contacts) {
            return Response.json(
                ApiSuccess("Getting contacts Successful", contacts[0], 200)
            )
        } else {
            throw new ApiError(500, "Getting contacts Failed")
        }

    } catch (error) {
        console.error('Error getting contacts: ', error);

        throw new ApiError(500, "Failed to get contacts")

    }
}