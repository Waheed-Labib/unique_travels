import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import RegionModel from "../../../models/region";

export async function GET(request: NextRequest) {
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
            return NextResponse.json(
                {
                    success: true,
                    message: "Getting regions successful",
                    data: result
                },
                {
                    status: 200
                }
            )
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Getting regions failed"
                },
                {
                    status: 400
                }
            )
        }

    } catch (error) {
        console.error('Error getting regions: ', error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to get regions"
            },
            {
                status: 500
            }
        )
    }
}

export async function POST(request: Request) {
    await dbConnect();

    try {

        const body = await request.json();
        const { name, image } = body;

        if (!name) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Name is required"
                },
                {
                    status: 400
                }
            )
        }

        if (!image) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Image is required"
                },
                {
                    status: 400
                }
            )
        }

        const newRegion = await RegionModel.create({ name, image });

        if (newRegion) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Region added successfully",
                    data: newRegion
                },
                {
                    status: 200
                }
            )
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Region was not added"
                },
                {
                    status: 400
                }
            )
        }
    } catch (error) {
        console.error('Adding Region Failed', error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to add region"
            },
            {
                status: 500
            }
        )
    }
}

export async function PATCH(req: Request) {

    await dbConnect();

    try {

        const body = await req.json();
        const { _id, name, image } = body;

        if (!_id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "_id not found"
                },
                {
                    status: 400
                }
            )
        }

        const region = await RegionModel.findById(_id);

        if (!region) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Region not found"
                },
                {
                    status: 400
                }
            )
        }

        if (region) {
            region.name = name
        }

        if (image) {
            region.image = image
        }

        await region.save();

        return NextResponse.json(
            {
                success: true,
                message: "Region updated successfully",
                data: region
            },
            {
                status: 200
            }
        )

    } catch (error) {

        console.error('Error updating region', error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to update region"
            },
            {
                status: 400
            }
        )

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
                {
                    status: 400
                }
            )
        }

        const deletedRegion = await RegionModel.deleteOne({ _id });

        if (deletedRegion) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Region deleted successfully"
                },
                {
                    status: 200
                }
            )
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Region was not deleted"
                },
                {
                    status: 400
                }
            )
        }

    } catch (error) {

        console.error('Error deleting region', error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete region"
            },
            {
                status: 500
            }
        )

    }
}