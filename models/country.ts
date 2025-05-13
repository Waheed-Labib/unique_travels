import mongoose, { Document, Schema } from "mongoose";

export interface Country extends Document {
    href: string,
    image: string,
    visaRequirements: string[]
}

export const CountrySchema: Schema<Country> = new Schema({
    href: {
        type: String,
        required: [true, "href is required"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    },
    visaRequirements: {
        type: [String],
        required: [true, 'Visa Requirements are required']
    }
})

const CountryModel = (mongoose.models.Country as mongoose.Model<Country>) || mongoose.model<Country>("Country", CountrySchema, "countries");

export default CountryModel;