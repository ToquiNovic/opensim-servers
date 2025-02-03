import { CreateServerDto, SearchFileDto } from "./server.dto";
import { ConfigServer, CreateServerService, DeleteServer } from "./services";
import directory from "../utils/directory";


export class ServerService {

    getServers() {
        return directory.getServers();
    }

    findOne({ gridname }: { gridname: string }) {
        return directory.getServerByGridName(gridname);
    }

    async create(createServer: CreateServerDto) {
        createServer.dataBaseName = `ua3d_${createServer.dataBaseName}`
        const server = await CreateServerService(createServer);
        ConfigServer(createServer)
        return server;
    }

    async delete({ gridname }: { gridname: string }) {
        return await DeleteServer(gridname);
    }

    async getServerFiles({ gridname }: { gridname: string }) {
        return await directory.getServerFiles(gridname)
    }

    serverFile(searchFile: SearchFileDto) {
        const { gridname, filename } = searchFile;
        return directory.searchServerFile(gridname, filename);
    }
}