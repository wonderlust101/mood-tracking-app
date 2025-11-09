import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../utils/errors.utils";

type Schema = {
    body?: ZodType,
    params?: ZodType,
    query?: ZodType,
}

export function zodValidation(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (schema.body) {
            const results = schema.body.safeParse(req.body);
            if (!results.success)
                throw new ValidationError(results.error)

            req.validatedBody = results.data;
        }

        if (schema.query) {
            const results = schema.query.safeParse(req.query);
            if (!results.success)
                throw new ValidationError(results.error)

            req.validatedQuery = results.data;
        }

        if (schema.params) {
            const results = schema.params.safeParse(req.params);
            if (!results.success)
                throw new ValidationError(results.error)

            req.validatedParams = results.data;
        }

        next()
    }
}