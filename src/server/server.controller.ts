import { Request, Response } from "express";
import { CreateServerDto } from "./dto/server.dto";
import { ServerService } from "./server.service";

class ServerController {

    constructor(private serverService: ServerService = new ServerService()) {
        this.serverService = serverService
    }

    createServer = (req: Request, res: Response) => {
        const createServerDto: CreateServerDto = req.body;
        this.serverService.createServer(createServerDto)
            .then((response) => {
                res.status(201).send(response)
            }).catch((error) => {
                res.status(500).send(error)
            })
    }

    deleteServer = (req: Request, res: Response) => { // api/server/:serverName
        const { gridName } = req.params;
        res.send(this.serverService.deleteServer({ gridName }))
    }

    findOneSever = (req: Request, res: Response) => {
        const { gridName } = req.params;
        res.send(this.serverService.findOneServer({ gridName }))
    }

    listServers = (_: Request, res: Response) => {
        res.send(this.serverService.listServers())
    }

    serverFile = (req: Request, res: Response) => {
        const { gridName, fileName } = req.body;
        res.send(this.serverService.serverFile({ gridName, fileName }))
    }

    listServerFiles = (req: Request, res: Response) => {
        const { gridName } = req.params;
        res.send(this.serverService.listServerFiles({ gridName }))
    }

    // api/server/start/:serverName
    startServer = (req: Request, res: Response) => {
        const { serverName } = req.params;
        res.send(this.serverService.startServer({ serverName }))
    }
}

export default new ServerController();