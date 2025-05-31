import { ApiError } from "../../../lib/apiError";
import { ApiSuccess } from "../../../lib/apiSuccess";
import dbConnect from "../../../lib/dbConnect";
import RegionModel from "../../../models/region";

export async function GET(request: Request) {
    await dbConnect();

    try {

        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');

        let result;

        if (name) {
            result = await RegionModel.findOne({ name: new RegExp(`^${name}$`, 'i') })
        } else {
            result = await RegionModel.find();
        }

        if (result) {
            return Response.json(ApiSuccess("Getting Regions Successful", result, 200))
        } else {
            return Response.json(ApiError('Getting Regions Failed', 500))
        }

    } catch (error) {
        console.error('Error getting regions: ', error);

        return Response.json(ApiError('Failed to get regions', 500))
    }
}

export async function POST(request: Request) {
    await dbConnect();

    try {

        const body = await request.json();
        const { name, image } = body;

        if (!name) {
            return Response.json(ApiError('Name is required', 400))
        }

        if (!image) {
            return Response.json(ApiError('Image is required', 400))
        }

        const newRegion = await RegionModel.create({ name, image });

        if (newRegion) {
            return Response.json(ApiSuccess('Region added successfully', newRegion, 200))
        } else {
            return Response.json(ApiError('Region was not added', 400))
        }
    } catch (error) {
        console.error('Adding Region Failed', error);
        return Response.json(ApiError('Failed to add region', 500))
    }
}

export async function PATCH(req: Request) {

    await dbConnect();

    try {

        const body = await req.json();
        const { _id, name, image } = body;

        if (!_id) {
            return Response.json(ApiError('_id not found', 400));
        }

        const region = await RegionModel.findById(_id);

        if (!region) {
            return Response.json(ApiError('Region Not Found', 400))
        }

        if (region) {
            region.name = name
        }

        if (image) {
            region.image = image
        }

        await region.save();

        return Response.json(ApiSuccess('Region updated successfully', region, 200));

    } catch (error) {

        console.error('Error updating region', error);
        return Response.json(ApiError('Failed to update region', 500));

    }
}

export async function DELETE(request: Request) {
    await dbConnect();

    try {
        const body = await request.json();
        const { _id } = body;

        if (!_id) {
            return Response.json(ApiError('_id not found', 400));
        }

        const deletedRegion = await RegionModel.deleteOne({ _id });

        if (deletedRegion) {
            return Response.json(ApiSuccess('Region Deleted Successfully', {}, 200));
        } else {
            return Response.json(ApiError('Region was not deleted', 400));
        }

    } catch (error) {

        console.error('Error deleting region', error);
        return Response.json(ApiError('Failed to delete region', 500));

    }
}