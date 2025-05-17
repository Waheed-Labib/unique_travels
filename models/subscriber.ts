import mongoose, { Document, Schema } from "mongoose";

export interface Subscriber extends Document {
    email: string
}

export const SubscriberSchema: Schema<Subscriber> = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    }
})

const SubscriberModel = (mongoose.models.Subscriber as mongoose.Model<Subscriber>) || mongoose.model<Subscriber>("Subscriber", SubscriberSchema, "subscribers");

export default SubscriberModel;