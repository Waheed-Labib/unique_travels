import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import RegionModel from "../../../models/region";

export async function POST(req: NextRequest) {

    await dbConnect();

    try {
        const body = await req.json();
        const { regionName } = body;

        const regionExists = await RegionModel.findOne({ name: regionName });

        if (regionExists) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Region Already Exists",
                    data: {
                        regionExists: true
                    }
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: true,
                    message: "Region Does not Exist",
                    data: {
                        regionExists: false
                    }
                },
                { status: 200 }
            );
        }

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Check-Region-Exist Failed",
            },
            { status: 500 }
        );
    }

}