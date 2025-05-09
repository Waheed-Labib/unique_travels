import { statusCode } from "./types"

export const ApiError = (message: string, status: statusCode) => {
    return Response.json(
        {
            success: false,
            message
        },
        {
            status
        }
    )
}

