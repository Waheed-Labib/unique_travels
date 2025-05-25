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
            return ApiError('Wrong Email', 400)
        }

        const isPasswordCorrect = await bcrypt.compare(password, admin.password);

        if (!isPasswordCorrect) {
            return ApiError('Wrong Password', 400)
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
            return ApiError('Something went wrong while genarating password', 400)
        }

        return Response.json(
            ApiSuccess("Login Successful", { _id: admin._id, email: admin.email }, 200)
        )
    } catch (error) {
        console.error('Login Failed: ', error);

        return ApiError('Login Failed', 500)
    }
}