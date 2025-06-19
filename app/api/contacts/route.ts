import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import ContactModel from "../../../models/contact";

export async function GET() {
    await dbConnect();

    try {

        const contacts = await ContactModel.find();

        if (contacts) {
            return NextResponse.json(
                {
                    success: true,
                    message: 'Getting contact successful',
                    data: contacts[0]
                },
                {
                    status: 200
                }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Getting contact failed'
                },
                {
                    status: 400
                }
            );
        }

    } catch (error) {
        console.error('Error getting contacts: ', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to get contacts'
            },
            {
                status: 500
            }
        );
    }
}

export async function PATCH(req: Request) {

    await dbConnect();

    try {

        const body = await req.json();
        const { _id, email, hotline, whatsAppNumber, address } = body;

        if (!_id) {
            return NextResponse.json(
                {
                    success: false,
                    message: '_id not found'
                },
                {
                    status: 400
                }
            );
        }

        const contact = await ContactModel.findById(_id);

        if (!contact) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Contact not found'
                },
                {
                    status: 400
                }
            );
        }

        if (email) {
            contact.email = email
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

        return NextResponse.json(
            {
                success: true,
                message: 'Contact updated successfully',
                data: contact
            },
            {
                status: 200
            }
        );

    } catch (error) {

        console.error('Error updating contact', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to update contact',
            },
            {
                status: 500
            }
        );

    }
}
