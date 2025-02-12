import { DeleteServer, authenticateAndCreateServer } from "./services";
import { CreateServerDto, SearchFileDto } from "./server.dto";
import directory from "../utils/directory";

export class ServerService {

    getServers() {
        return directory.getServers();
    }

    findOne({ gridName }: { gridName: string }) {
        return directory.getServerByGridName(gridName);
    }

    async create(createServer: CreateServerDto) {
        const data = await authenticateAndCreateServer(createServer);
        return data
    }

    async delete({ gridName }: { gridName: string }) {
        return await DeleteServer(gridName);
    }

    async getServerFiles({ gridName }: { gridName: string }) {
        return await directory.getServerFiles(gridName)
    }

    serverFile(searchFile: SearchFileDto) {
        const { gridName, filename } = searchFile;
        return directory.searchServerFile(gridName, filename);
    }
}