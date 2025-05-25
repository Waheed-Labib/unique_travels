import { statusCode } from "./types"

class ApiError extends Error {

    status: statusCode;
    data: unknown;
    success: boolean;
    errors: unknown[];

    constructor(
        status: statusCode,
        message = "Something Went Wrong",
        errors = [],
        stack = ""
    ) {
        super(message)
        this.status = status
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }