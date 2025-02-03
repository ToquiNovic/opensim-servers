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
            log(LogLevel.ERROR, 'Getting servers:', (error as Error).message)
            next(error)
        }
    }

    getByGridName = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { gridname } = req.params
            res.status(200).json(this.service.findOne({ gridname }))
        } catch (error) {
            log(LogLevel.ERROR, 'Getting server:', (error as Error).message)
            next(error)
        }

    }

    create = (req: Request, res: Response, next: NextFunction) => {
        const createServer: CreateServerDto = req.body
        this.service.create(createServer).then((response) => {
            res.status(201).json(response)
        }).catch((error) => {
            log(LogLevel.ERROR, 'Creating server:', error.message)
            next(error)
        })
    }

    delete = (req: Request, res: Response, next: NextFunction) => {
        const { gridname } = req.params
        this.service.delete({ gridname }).then((response) => {
            res.status(200).json(response)
        }).catch((error) => {
            log(LogLevel.ERROR, 'Deleting server:', error.message)
            next(error)
        })
    }

    getFiles = (req: Request, res: Response, next: NextFunction) => {
        const { gridname } = req.params
        this.service.getServerFiles({ gridname }).then((response) => {
            log(LogLevel.SUCCESS, 'Searching file: Success')
            res.status(200).json(response)
        }).catch((error) => {
            log(LogLevel.ERROR, 'Getting server files:', error.message)
            next(error)
        })

    }

    searchFile = (req: Request, res: Response, next: NextFunction) => {
        const search: SearchFileDto = req.body
        try {
            const response = this.service.serverFile(search)
            log(LogLevel.SUCCESS, 'Searching file: Success')
            res.status(200).json(response)
        } catch (error) {
            log(LogLevel.ERROR, 'Searching file:', (error as Error).message)
            next(error)
        }
    }
}

export default new ServerController()