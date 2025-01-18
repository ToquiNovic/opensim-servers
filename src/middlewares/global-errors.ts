import { NextFunction, Request, Response } from "express";

export const GlobalErrors = (
    error: unknown,
    _: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof CustomError) {
        res.status(error.status).send({ message: error.message });
    } else if (error instanceof Error) {
        res.status(500).send({ message: error.message });
    } else {
        res.status(500).send({ message: "An unknown error occurred" });
    }
    next();
}

export class CustomError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}