import mongoose, { Document, Schema } from "mongoose";

export interface Subscriber extends Document {
    email: string,
    isVerified: boolean,
    verificationToken: string | undefined,
    verificationTokenExpiry: Date | undefined
}

export const SubscriberSchema: Schema<Subscriber> = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        required: false
    },
    verificationTokenExpiry: {
        type: Date,
        required: false
    }
})

const SubscriberModel = (mongoose.models.Subscriber as mongoose.Model<Subscriber>) || mongoose.model<Subscriber>("Subscriber", SubscriberSchema, "subscribers");

export default SubscriberModel;