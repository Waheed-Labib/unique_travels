import { ApiError } from "../../../lib/apiError";
import { ApiSuccess } from "../../../lib/apiSuccess";
import dbConnect from "../../../lib/dbConnect";
import ContactModel from "../../../models/contact";

export async function GET() {
    await dbConnect();

    try {

        const contacts = await ContactModel.find();

        if (contacts) {
            return Response.json(ApiSuccess("Getting contacts Successful", contacts[0], 200));
        } else {
            return Response.json(ApiError('Getting contacts failed', 500));
        }

    } catch (error) {
        console.error('Error getting contacts: ', error);

        return Response.json(ApiError('Failed to get contacts', 500));
    }
}

export async function PATCH(req: Request) {

    await dbConnect();

    try {

        const body = await req.json();
        const { _id, hotline, whatsAppNumber, address } = body;

        if (!_id) {
            return Response.json(ApiError('_id not found', 400));
        }

        const contact = await ContactModel.findById(_id);

        if (!contact) {
            return Response.json(ApiError('Contact Not Found', 400))
        }

        if (hotline) {
            contact.hotline = hotline
        }

        if (whatsAppNumber) {
            contact.whatsAppNumber = whatsAppNumber
        }

        if (address) {
            contact.address = address
        }

        await contact.save();

        return Response.json(ApiSuccess('Contacts updated successfully', contact, 200));

    } catch (error) {

        console.error('Error updating contact', error);
        return Response.json(ApiError('Failed to update contact', 500));

    }
}
