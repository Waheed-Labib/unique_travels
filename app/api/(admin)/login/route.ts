import dbConnect from "../../../../lib/dbConnect";
import AdminModel from "../../../../models/admin";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.JWT_SECRET!;

export async function POST(request: NextRequest) {
    await dbConnect();

    try {

        const body = await request.json();
        const { email, password } = body;

        const admin = await AdminModel.findOne({ email });

        if (!admin) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Wrong Email",
                },
                { status: 400 }
            );
        }

        const isPasswordCorrect = await bcrypt.compare(password, admin.password);

        if (!isPasswordCorrect) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Wrong Password",
                },
                { status: 400 }
            );
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
            return NextResponse.json(
                {
                    success: false,
                    message: "Something went wrong while generating the token",
                },
                { status: 400 }
            )
        }

        const cookie = serialize('token', token, {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: Number(process.env.JWT_EXPIRY),
        });

        const response = NextResponse.json(
            {
                success: true,
                message: "Login Successful",
                data: {
                    _id: admin._id,
                    email: admin.email,
                },
            },
            { status: 200 }
        );

        response.headers.set("Set-Cookie", cookie);
        return response;

    } catch (error) {
        console.error('Login Failed: ', error);

        return NextResponse.json(
            {
                success: false,
                message: "Login Failed",
            },
            { status: 500 }
        );
    }
}