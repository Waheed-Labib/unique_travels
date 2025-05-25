import { statusCode } from "./types"

export const ApiSuccess = (message: string, data: object, status: statusCode) => {
    return {
        success: true,
        data,
        message,
        status
    }
}
