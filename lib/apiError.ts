import { statusCode } from "./types"

export const ApiError = (message: string, status: statusCode) => {
    return {
        success: false,
        message,
        status
    }
}

