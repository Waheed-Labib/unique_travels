import { ApiError } from "../../../../lib/apiError";
import { ApiSuccess } from "../../../../lib/apiSuccess";
import dbConnect from "../../../../lib/dbConnect";
import AdminModel from "../../../../models/admin";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";

export async function POST(req: Request, res: Response) {
    await dbConnect();

    try {

        const { email, password } = req.body;

        const admin = await AdminModel.findOne({ email });

        if (!admin) {
            throw new ApiError(400, "Wrong Email")
        }

        const isPasswordCorrect = await bcrypt.compare(password, admin.password);

        if (!isPasswordCorrect) {
            throw new ApiError(400, "Wrong Password")
        }

        let token;

        try {
            token = jwt.sign(
                {
                    _id: admin._id,
                    email: admin.email
                },
                process.env.JWT_SECRET!,
                {
                    expiresIn: Number(process.env.JWT_EXPIRY)
                }
            )

            admin.token = token;
            await admin.save();

        } catch (error) {
            console.error('Genarate Token Failed: ', error);
            throw new ApiError(500, "Something went wrong while generating token");
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .cookie('token', token, options)
            .json(
                ApiSuccess(
                    "Login Successful",
                    {
                        _id: admin._id,
                        email: admin.email
                    },
                    200),
            )

    } catch (error) {
        console.error('Login Failed: ', error);

        throw new ApiError(500, "Login failed");
    }
}