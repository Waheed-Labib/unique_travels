import mongoose, { Document, Schema } from "mongoose";

export interface Package extends Document {
    countries: string[],
    details: object,
    isFeatured: boolean,
    code: number
}

export const PackageSchema: Schema<Package> = new Schema({
    countries: {
        type: [String],
        required: true
    }
    ,
    details: {
        type: Object,
        required: [true, "Details is required"]
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    code: {
        type: Number
    }
})

const PackageModel = (mongoose.models.Package as mongoose.Model<Package>) || mongoose.model<Package>("Package", PackageSchema, "packages");

export default PackageModel;