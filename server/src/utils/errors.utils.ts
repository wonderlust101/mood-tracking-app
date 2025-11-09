import { StatusCodes } from "http-status-codes";

// Base Custom Error
export default class CustomAPIError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequest extends CustomAPIError {
    constructor(message: string = "Bad Request") {
        super(message, StatusCodes.BAD_REQUEST);
    }
}

export class Conflict extends CustomAPIError {
    constructor(message = "Conflict: Resource already exists or is in use") {
        super(message, StatusCodes.CONFLICT, true);
        this.name = "ConflictError";
    }
}

export class Forbidden extends CustomAPIError {
    constructor(message = "You do not have permission to access this resource") {
        super(message, StatusCodes.FORBIDDEN, true);
        this.name = "ForbiddenError";
    }
}

export class NotFound extends CustomAPIError {
    constructor(message = "Resource not found") {
        super(message, StatusCodes.NOT_FOUND, true);
        this.name = "NotFoundError";
    }
}

export class Unauthorized extends CustomAPIError {
    constructor(message = "Unauthorized: Invalid credentials") {
        super(message, StatusCodes.UNAUTHORIZED, true);
        this.name = "UnauthorizedError";
    }
}

// TODO: ADD ZOD VALIDATION ERROR
export class ValidationError extends CustomAPIError {
    public errors: Record<string, string[]>;

    constructor(message: string, errors: Record<string, string[]>) {
        super("Validation failed", StatusCodes.UNPROCESSABLE_ENTITY, true);

        this.name = "ZodValidationError";
        this.errors = errors;
    }
}