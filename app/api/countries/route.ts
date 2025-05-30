import { ApiError } from "../../../lib/apiError";
import { ApiSuccess } from "../../../lib/apiSuccess";
import dbConnect from "../../../lib/dbConnect";
import CountryModel from "../../../models/country";

export async function GET(request: Request) {
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
            return Response.json(ApiSuccess("Getting countries Successful", result, 200))
        } else {
            return Response.json(ApiError('Getting countries failed', 500))
        }

    } catch (error) {
        console.error('Error getting countries: ', error);

        return Response.json(ApiError('Failed to get countries', 500))
    }
}

export async function POST(request: Request) {
    await dbConnect();

    try {

        const body = await request.json();
        const { name, image, visaRequirements } = body;

        const newCountry = await CountryModel.create({ name, image, visaRequirements });

        if (newCountry) {
            return Response.json(ApiSuccess('Country added successfully', newCountry, 200))
        } else {
            return Response.json(ApiError('Country was not added', 400))
        }
    } catch (error) {
        console.error('Adding Country Failed', error);
        return Response.json(ApiError('Failed to add country', 500))
    }
}

export async function PATCH(request: Request) {

}

export async function DELETE(request: Request) {

}

