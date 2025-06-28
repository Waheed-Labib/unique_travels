import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import CountryModel from "../../../models/country";

export async function POST(req: NextRequest) {

    await dbConnect();

    try {
        const body = await req.json();
        const { countryName } = body;

        const countryExists = await CountryModel.findOne({ name: countryName });

        if (countryExists) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Country Already Exists",
                    data: {
                        countryExists: true
                    }
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: true,
                    message: "Country Does not Exist",
                    data: {
                        countryExists: false
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
                message: "Check-Country-Exist Failed",
            },
            { status: 500 }
        );
    }

}