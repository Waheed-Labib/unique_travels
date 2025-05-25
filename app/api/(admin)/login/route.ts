import { ApiError } from "../../../../lib/apiError";
import { ApiSuccess } from "../../../../lib/apiSuccess";
import dbConnect from "../../../../lib/dbConnect";
import AdminModel from "../../../../models/admin";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    await dbConnect();

    try {

        const body = await request.json();
        const { email, password } = body;

        const admin = await AdminModel.findOne({ email });

        if (!admin) {
            return Response.json(
                ApiError("Wrong Email", 400),
            )
        }

        const isPasswordCorrect = await bcrypt.compare(password, admin.password);

        if (!isPasswordCorrect) {
            return Response.json(
                ApiError("Wrong Password", 400),
            )
        }

        const token = jwt.sign(
            {
                _id: admin._id,
                email: admin.email
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: Number(process.env.JWT_EXPIRY)
            }
        )

        return Response
            .json(
                ApiSuccess("Login Successful", {}, 200),
            )

    } catch (error) {
        console.error('Login Failed: ', error);

        return Response.json(
            ApiError("Login Failed", 500),
        )
    }
}