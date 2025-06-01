import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import CountryModel from "../../../models/country";

export async function GET(request: NextRequest) {
    await dbConnect();

    try {

        const { searchParams } = new URL(request.url);
        const country = searchParams.get('country');
        const countries = searchParams.get('countries')?.split(',');

        let result;

        if (country) {

            result = await CountryModel.findOne({
                name: new RegExp(`^${country}$`, 'i') // 'i' flag makes it case-insensitive
            })

        } else if (countries) {

            result = [];

            for (let i = 0; i < countries.length; i++) {
                const country = await CountryModel.findOne({
                    name: new RegExp(`^${countries[i]}$`, 'i') // 'i' flag makes it case-insensitive
                })

                result.push(country);
            }

        } else {

            result = await CountryModel.find();

        }

        if (result) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Getting Countries Successful"
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Getting Countries Failed"
                },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error('Error getting countries: ', error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to get countries"
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    await dbConnect();

    try {

        const body = await request.json();
        const { name, image, visaRequirements } = body;

        if (!name) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Name is required"
                },
                { status: 400 }
            );
        }

        if (!image) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Name is required"
                },
                { status: 400 }
            );
        }

        if (!visaRequirements || !visaRequirements.length) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Visa Requirements are required"
                },
                { status: 400 }
            );
        }

        const newCountry = await CountryModel.create({ name, image, visaRequirements });

        if (newCountry) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Country added successfully"
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Country was not added"
                },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Adding Country Failed', error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to add country"
            },
            { status: 500 }
        );
    }
}

export async function PATCH(req: NextRequest) {

    await dbConnect();

    try {

        const body = await req.json();
        const { _id, name, image, visaRequirements } = body;

        if (!_id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "_id is not provided in the request"
                },
                { status: 400 }
            );
        }

        const country = await CountryModel.findById(_id);

        if (!country) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Country not found"
                },
                { status: 400 }
            );
        }

        if (name) {
            country.name = name
        }

        if (image) {
            country.image = image
        }

        if (visaRequirements) {
            country.visaRequirements = visaRequirements
        }

        await country.save();

        return NextResponse.json(
            {
                success: true,
                message: "Country updated successfully"
            },
            { status: 200 }
        );

    } catch (error) {

        console.error('Error updating country', error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to update country"
            },
            { status: 500 }
        );

    }
}

export async function DELETE(request: Request) {
    await dbConnect();

    try {
        const body = await request.json();
        const { _id } = body;

        if (!_id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "_id not found"
                },
                { status: 400 }
            );
        }

        const deletedCountry = await CountryModel.deleteOne({ _id });

        if (deletedCountry) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Country deleted successfully"
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Country was not deleted"
                },
                { status: 400 }
            );
        }

    } catch (error) {

        console.error('Error deleting country', error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete country"
            },
            { status: 500 }
        );

    }
}
