import mongoose, { Document, Schema } from "mongoose";

export interface Contact extends Document {
    email: string,
    hotline: string,
    whatsAppNumber: string,
    address: string
}

export const ContactSchema: Schema<Contact> = new Schema({
    email: {
        type: String
    },
    hotline: {
        type: String
    },
    whatsAppNumber: {
        type: String
    },
    address: {
        type: String
    }
})

const ContactModel = (mongoose.models.Contact as mongoose.Model<Contact>) || mongoose.model<Contact>("Contact", ContactSchema, "contacts");

export default ContactModel;


