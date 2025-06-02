import mongoose, { Document, Schema } from "mongoose";

export interface Country extends Document {
    name: string,
    image: string,
    visaRequirements: string[]
}

export const CountrySchema: Schema<Country> = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
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