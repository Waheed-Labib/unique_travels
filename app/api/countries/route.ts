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
            return ApiSuccess("Getting countries Successful", result, 200)
        } else {
            return ApiError('Getting countries failed', 500)
        }

    } catch (error) {
        console.error('Error getting countries: ', error);

        return ApiError('Failed to get countries', 500)
    }
}