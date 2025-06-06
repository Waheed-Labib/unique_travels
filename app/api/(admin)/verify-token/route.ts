import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import jwt, { JwtPayload } from "jsonwebtoken";
import AdminModel from "../../../../models/admin";

const SECRET = process.env.JWT_SECRET!;

export async function GET(request: NextRequest) {

    await dbConnect();

    interface TokenPayload extends JwtPayload {
        email: string;
        _id: string;
    }

    const token = request.cookies.get('token')?.value;
    if (!token) {
        return NextResponse.json(
            {
                success: false,
                message: "Token not found",
            },
            { status: 400 }
        );
    }

    try {
        const decoded = jwt.verify(token, SECRET) as TokenPayload;

        const admin = await AdminModel.findById(decoded._id);

        if (!admin || token !== admin.token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid Token",
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Token Verified",
                data: decoded
            },
            { status: 200 }
        );;

    } catch (err) {
        console.error(err);

        return NextResponse.json(
            {
                success: false,
                message: "Token Verification Failed",
            },
            { status: 500 }
        );
    }
}