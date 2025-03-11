import { NextFunction, Request, Response } from "express";
import { ServerService } from "./server.service";
import { CreateServerDto, SearchFileDto } from "./server.dto";
import { log, LogLevel } from "../utils/logger";

class ServerController {
    constructor(private service: ServerService = new ServerService()) {
        this.service = service;
    }

    get = (_: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(this.service.getServers())
        } catch (error) {
            log(LogLevel.ERROR, 'Getting servers:', { message: (error as Error).message })
            next(error)
        }
    }

    getByGridName = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { gridName } = req.params
            res.status(200).json(this.service.findOne({ gridName }))
        } catch (error) {
            log(LogLevel.ERROR, 'Getting server:', { message: (error as Error).message })
            next(error)
        }

    }

    create = (req: Request, res: Response, next: NextFunction) => {
        const createServer: CreateServerDto = req.body
        this.service.create(createServer).then((response) => {
            res.status(201).json(response)
        }).catch((error) => {
            log(LogLevel.ERROR, 'Creating server:', { message: error.message})
            next(error)
        })
    }

    delete = (req: Request, res: Response, next: NextFunction) => {
        const { gridName } = req.params
        this.service.delete({ gridName }).then((response) => {
            res.status(200).json(response)
        }).catch((error) => {
            log(LogLevel.ERROR, 'Deleting server:', error.message)
            next(error)
        })
    }

    getFiles = (req: Request, res: Response, next: NextFunction) => {
        const { gridName } = req.params
        try {
            const response = this.service.getServerFiles({ gridName })
            log(LogLevel.SUCCESS, 'Getting server files: Success')
            res.status(200).json(response)
        } catch (error) {
            log(LogLevel.ERROR, 'Getting server files')
            next(error)
        }
    }

    updateFile = (req: Request, res: Response, next: NextFunction) => {
        const {filePath, content}: SearchFileDto = req.body
        try {
            this.service.updateFile({ filePath, content });
            log(LogLevel.SUCCESS, 'Updating file content: Success');
            res.status(200).json({ message: 'File content updated successfully' });
        } catch (error) {
            log(LogLevel.ERROR, 'Updating file content:', { message: (error as Error).message });
            next(error);
        }
    }
}

export default new ServerController()