import { BadRequestError } from "../../middlewares/global-errors";
import { log,  LogLevel } from '../../utils/logger'
import { EnvConfig } from "../utils/env.config";
import { DataServerDto } from "../server.dto";
import { spawnn } from "../../utils";
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

export  function StartPvto(dir: string): void{
    try {
        log(LogLevel.WARNING, `Starting pvto in ${dir}`)
        const res = spawnn('python main.py', dir)
        console.log(res)
        log(LogLevel.SUCCESS, `Pvto started`)
    } catch (error) {
        throw new BadRequestError(`${(error as Error).message}`);
    }

}
