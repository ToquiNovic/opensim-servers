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

    getServerFiles({ gridName }: { gridName: string }) {
        return directory.getServerFiles(gridName)
    }

    updateFile(searchFile: SearchFileDto) {
        const { filePath, content } = searchFile;
        return directory.writeOrUpdateFile(filePath, content);
    }
}