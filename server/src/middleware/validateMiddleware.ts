// import dependencies
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import httpErrors from "http-errors";

const validateBody = (schema: z.ZodTypeAny) => {
    const validate = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            req.body = await schema.parseAsync(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const zodFormattedError = new httpErrors.BadRequest();
                // only the first error message
                zodFormattedError.message = error.issues[0].message;
                next(zodFormattedError);
                return;
            }
            next(error);
        }
    };

    return validate;
};

const validateParams = (schema: z.ZodTypeAny) => {
    const validate = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            req.params = (await schema.parseAsync(req.params)) as any;
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const zodFormattedError = new httpErrors.BadRequest();
                // only the first error message
                zodFormattedError.message = error.issues[0].message;
                next(zodFormattedError);
            }
            next(error);
        }
    };

    return validate;
};

export { validateBody, validateParams };
