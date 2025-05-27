import { ApiError } from "../../../../lib/apiError";
import dbConnect from "../../../../lib/dbConnect";
import AdminModel from "../../../../models/admin";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const SECRET = process.env.JWT_SECRET!;

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
                SECRET,
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

        const cookie = serialize('token', token, {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: Number(process.env.JWT_EXPIRY),
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: "Login Successful",
                data: {
                    _id: admin._id,
                    email: admin.email
                }
            }),
            {
                status: 200,
                headers: {
                    'Set-Cookie': cookie,
                    'Content-Type': 'application/json',
                },
            }
        )
    } catch (error) {
        console.error('Login Failed: ', error);

        return ApiError('Login Failed', 500)
    }
}