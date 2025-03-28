import { BadRequestError } from "../../middlewares/global-errors";
import { log, LogLevel, Status } from '../../utils/logger'
import { EnvConfig } from "../utils/pvtoEnv";
import { DataServerDto } from "../server.dto";
import { spawnn } from "../../utils";
import Directory from "../../utils/directory";
import path from 'node:path'

export function ConfigurePvto(dir: string, data: DataServerDto): void {
    try {
        log(LogLevel.INFO, `Configuring pvto in ${dir}`)
        const connten = EnvConfig(data)
        const envFilePath = path.join(dir, '.env')
        Directory.writeOrUpdateFile(envFilePath, connten)
        log(LogLevel.SUCCESS, `Pvto configurated`)

    } catch (error) {
        throw new BadRequestError(`${(error as Error).message}`);
    }
}

export async function StartPvto(dir: string, id: string): Promise<void> {
    try {
        log(LogLevel.WARNING, `Starting pvto in ${dir}`)
    
        const consoleType = 'python.exe'
        const command = consoleType.toLowerCase() === 'python.exe' ? 'main.py' : 'python main.py';
        
        spawnn(command, dir, consoleType);
        
        await log(LogLevel.SUCCESS, `Pvto started`, { 
            server: id,
            message: 'Pvto started', 
            state: Status.SERVER_CONFIGURATION_COMPLETED 
        })
    } catch (error) {
        throw new BadRequestError(`${(error as Error).message}`);
    }
}
