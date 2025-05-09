import { statusCode } from "./types";

export const ApiSuccess = (message: string, data: object, status: statusCode) => {
    return Response.json(
        {
            success: true,
            message,
            data
        },
        {
            status
        }
    )
}