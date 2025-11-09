declare global {
    namespace Express {
        interface Request {
            validatedQuery?: any;
            validatedBody?: any;
            validatedParams?: any;
            user?: any;
        }

        interface Response {
            cookie?: any;
        }
    }
}

export {};