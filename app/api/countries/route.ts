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
            }).sort({ name: 1 })

        } else if (countries) {

            result = [];

            for (let i = 0; i < countries.length; i++) {
                const country = await CountryModel.findOne({
                    name: new RegExp(`^${countries[i]}$`, 'i') // 'i' flag makes it case-insensitive
                }).sort({ name: 1 })

                result.push(country);
            }

        } else {

            result = await CountryModel.find().sort({ name: 1 });

        }

        if (result) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Getting Countries Successful",
                    data: result
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

        const cleanedRequirements = visaRequirements.filter((str: string) => str != "")

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

        if (!visaRequirements || !cleanedRequirements.length) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Visa Requirements are required"
                },
                { status: 400 }
            );
        }

        const newCountry = await CountryModel.create({ name, image, visaRequirements: cleanedRequirements });

        if (newCountry) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Country added successfully",
                    data: newCountry
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

        const cleanedRequirements = visaRequirements.filter((str: string) => str != "");

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

        if (cleanedRequirements.length) {
            country.visaRequirements = cleanedRequirements
        }

        await country.save();

        return NextResponse.json(
            {
                success: true,
                message: "Country updated successfully",
                data: country
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
        const { _id, name } = body;

        if (!_id && !name) {
            return NextResponse.json(
                {
                    success: false,
                    message: "_id or name not found"
                },
                { status: 400 }
            );
        }

        let deletedCountry;

        if (_id) {
            deletedCountry = await CountryModel.deleteOne({ _id });
        }

        if (name) {
            deletedCountry = await CountryModel.deleteOne({ name });
        }

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

