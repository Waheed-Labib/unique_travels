import mongoose, { Document, Schema } from "mongoose";

export interface Region extends Document {
    name: string,
    href: string,
    image: string
}

export const RegionSchema: Schema<Region> = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    href: {
        type: String,
        required: [true, "href is required"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    }
})

const RegionModel = (mongoose.models.Region as mongoose.Model<Region>) || mongoose.model<Region>("Region", RegionSchema, "regions");

export default RegionModel;