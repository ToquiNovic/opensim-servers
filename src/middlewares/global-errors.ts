import { NextFunction, Request, Response } from "express";

export const GlobalErrors = (
    error: unknown,
    _: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.headersSent) {
        return next(error);
    }

    if (error instanceof CustomError) {
        res.status(error.status).send({ message: error.message });
    } else if (error instanceof Error) {
        res.status(500).send({ message: error.message });
    } else {
        res.status(500).send({ message: "An unknown error occurred" });
    }
}

export class CustomError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string = "Not Found") {
        super(message, 404);
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string = "Bad Request") {
        super(message, 400);
    }
}