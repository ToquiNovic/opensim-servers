import { CreateServerDto } from "./dto/server.dto";
import { CreateServerService, ConfigServer } from "../services";
import { getServerFile, getServerFiles, getServers } from "../utils";

export class ServerService {

    async createServer(createServerDto: CreateServerDto) {
        const server = await CreateServerService(createServerDto)
        ConfigServer(createServerDto)
        return server
    }

    deleteServer({ gridName }: { gridName: string }) {
        return `Server ${gridName} deleted`
    }

    findOneServer({ gridName }: { gridName: string }) {
        return gridName
    }

    listServers() {
        return getServers();
    }

    serverFile({ gridName, fileName }: { gridName: string, fileName: string }) {
        return getServerFile(gridName, fileName)
    }

    listServerFiles({ gridName }: { gridName: string }) {
        return getServerFiles(gridName);
    }

    startServer({ serverName }: { serverName: string }) {
        return `Server ${serverName} started`
    }
}