import { CreateServerDto } from "./dto/server.dto";
import { CreateServerService, ConfigServer } from "../services";
import { getServerFile, getServerFiles, getServers, deleteServer } from "../utils";

export class ServerService {

    async createServer(createServerDto: CreateServerDto) {
        // Name of the database
        createServerDto.dataBaseName = `UA3D_${createServerDto.gridName}`

        const server = await CreateServerService(createServerDto)

        ConfigServer(createServerDto)
        
        return server
    }

    deleteServer({ gridName }: { gridName: string }) {
        return deleteServer(gridName)
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