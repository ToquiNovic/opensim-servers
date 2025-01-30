import { NextFunction, Request, Response } from "express";
import { CommandService } from "./command.service";

class CommandController {
    constructor(private service: CommandService = new CommandService()) {
        this.service = service;
    }

    init = (req: Request, res: Response, next: NextFunction) => {
        const dir = req.body
        try { res.status(200).json(this.service.init(dir)) } catch (error) { next(error) }
    }

    start = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json({ "message": "hola" })
        } catch (error) { next(error) }

    }

    createUser = (req: Request, res: Response, next: NextFunction) => {
        try { res.status(200).json({ "message": "hola" }) } catch (error) { next(error) }

    }

    stop = (req: Request, res: Response, next: NextFunction) => {
        try { res.status(200).json({ "message": "hola" }) } catch (error) { next(error) }

    }
}

export default new CommandController()