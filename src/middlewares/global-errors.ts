import { NextFunction, Request, Response } from "express";

export const GlobalErrors = (
    error: unknown,
    _: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof Error) {
        res.status(500).send(error.message)
    }
    next()
}