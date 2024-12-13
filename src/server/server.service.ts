import { CreateServerDto } from "./dto/server.dto";
import { CreateServerService, ConfigServer } from "@services/index";

export class ServerService {

    createServer(createServerDto: CreateServerDto) {
        CreateServerService(createServerDto)
        ConfigServer(createServerDto)
        return "Server Created"
    }

    deleteServer({ serverName }: { serverName: string }) {
        return `Server ${serverName} deleted`

    }

    listServers() {
        return 'List of servers'
    }

    startServer({ serverName }: { serverName: string }) {
        return `Server ${serverName} started`

    }
}