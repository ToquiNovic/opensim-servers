import Directory from "../../utils/directory";
import { DataServerDto } from "../server.dto";
import { EnvConfig } from "../utils/env.config";
import path from 'node:path'


export function ConfigurePvto(dir: string, data: DataServerDto): void {
    try {
        const connten = EnvConfig(data)
        const envFilePath = path.join(dir, '.env')
        Directory.writeFile(envFilePath, connten)
    } catch (error) {
        throw new Error(`${(error as Error).message}`);
    }
}

// export function StartPvto(serverId: string) {

// }
