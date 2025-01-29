import { CreateServerDto, SearchFileDto } from "./server.dto";
import { ConfigServer } from "./services/server.config";
import { CreateServerService } from "./services/server.create";
import directory from "../utils/directory";

export class ServerService {

    getServers() {
        return directory.getServers();
    }

    findOne({ gridname }: { gridname: string }) {
        return directory.getServerByGridName(gridname);
    }

    async create(createServer: CreateServerDto) {
        createServer.dataBaseName = `UA3D_${createServer.dataBaseName}`
        const server = await CreateServerService(createServer);
        ConfigServer(createServer)
        return server;
    }

    delete({ gridname }: { gridname: string }) {
        return directory.delete(gridname);
    }

    async getServerFiles({ gridname }: { gridname: string }) {
        return await directory.getServerFiles(gridname)
    }

    serverFile(searchFile: SearchFileDto) {
        const { gridname, filename } = searchFile;
        return directory.searchServerFile(gridname, filename);
    }
}