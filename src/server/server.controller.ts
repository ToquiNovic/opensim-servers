import { Request, Response } from "express";
import { CreateServerDto } from "./dto/server.dto";
import { ServerService } from "./server.service";

class ServerController {

    constructor(private serverService: ServerService = new ServerService()) {
        this.serverService = serverService
    }

    createServer = (req: Request, res: Response) => {
        const createServerDto: CreateServerDto = req.body;
        res.send(this.serverService.createServer(createServerDto))
    }

    // api/server/:serverName
    deleteServer = (req: Request, res: Response) => {
        const { serverName } = req.params;
        res.send(this.serverService.deleteServer({ serverName }))
    }

    listServers = (_: Request, res: Response) => {
        res.send(this.serverService.listServers())
    }

    // api/server/start/:serverName
    startServer = (req: Request, res: Response) => {
        const { serverName } = req.params;
        res.send(this.serverService.startServer({ serverName }))
        // start server
    }
}

export default new ServerController();