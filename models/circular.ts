import mongoose, { Document, Schema } from "mongoose";

export interface Circular extends Document {
    region: string,
    image: string
}

export const CircularSchema: Schema<Circular> = new Schema({
    region: {
        type: String,
        required: [true, "Region is required"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    }
})

const CircularModel = (mongoose.models.Circular as mongoose.Model<Circular>) || mongoose.model<Circular>("Circular", CircularSchema, "circulars");

export default CircularModel;