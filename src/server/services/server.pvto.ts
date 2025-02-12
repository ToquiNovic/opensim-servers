import { BadRequestError } from "../../middlewares/global-errors";
import { log,  LogLevel } from '../../utils/logger'
import { EnvConfig } from "../utils/env.config";
import { DataServerDto } from "../server.dto";
import { execute } from "../../utils";
import Directory from "../../utils/directory";
import path from 'node:path'

export function ConfigurePvto(dir: string, data: DataServerDto): void {
    try {
        log(LogLevel.INFO, `Configuring pvto in ${dir}`)
        const connten = EnvConfig(data)
        const envFilePath = path.join(dir, '.env')
        Directory.writeFile(envFilePath, connten)
        log(LogLevel.SUCCESS, `Pvto configurated`)

    } catch (error) {
        throw new BadRequestError(`${(error as Error).message}`);
    }
}

export async  function StartPvto(dir: string): Promise<void>{
    try {
        log(LogLevel.WARNING, `Starting pvto in ${dir}`)
        const res = await execute('python main.py', dir)
        log(LogLevel.SUCCESS, `Pvto started`)
        console.log(res)
    } catch (error) {
        throw new BadRequestError(`${(error as Error).message}`);
    }

}
