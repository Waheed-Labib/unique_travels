import { ApiError } from "../../../lib/apiError";
import { ApiSuccess } from "../../../lib/apiSuccess";
import dbConnect from "../../../lib/dbConnect";
import AdminModel from "../../../models/admin";
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    await dbConnect();

    try {

        const body = await request.json();
        const { email, password } = body;

        const admin = await AdminModel.findOne({ email });

        if (!admin) {
            return ApiError('Wrong Email', 400);
        }

        const isPasswordCorrect = await bcrypt.compare(password, admin.password);

        if (!isPasswordCorrect) {
            return ApiError('Wrong Password', 400);
        }

        return ApiSuccess('Login Successful', {}, 200);

    } catch (error) {
        console.error('Login Failed: ', error);

        return ApiError("Login Failed", 500)
    }
}