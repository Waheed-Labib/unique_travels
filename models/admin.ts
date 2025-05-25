import mongoose, { Document, Schema } from "mongoose";

export interface Admin extends Document {
    email: string,
    password: string,
    token: string
}

export const AdminSchema: Schema<Admin> = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    token: {
        type: String
    }
})

const AdminModel = (mongoose.models.Admin as mongoose.Model<Admin>) || mongoose.model<Admin>("Admin", AdminSchema, "admins");

export default AdminModel;