import { regionConfig, WorldInit } from "../utils";
import { CustomError } from "../../middlewares/global-errors";
import { DataServerDto } from "../server.dto";
import { log, LogLevel } from "../../utils/logger";
import Directory from "../../utils/directory";
import path from "node:path";
import fs from 'node:fs'


function createDirectoryIfNotExist(directory: string) {
    try {
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(path.dirname(directory), { recursive: true });
            log(LogLevel.WARNING, `Config file: Not exist, creating directory ${directory}`);
        }
    } catch (error) {
        throw new CustomError(`Error creating directory: ${directory}, ${(error as Error).message}`, 500);
    }
}


export function ConfigServerService(config: DataServerDto): void{
    // Path
    const { serverPath, regionPath, worldPath } = Directory.getRootPath(config.gridName)

    // Create server folder
    createDirectoryIfNotExist(serverPath)

    // Create region and world files
    createDirectoryIfNotExist(regionPath)
    createDirectoryIfNotExist(worldPath)

    // Create region and world files
    const regionContent = regionConfig(config)
    const worldContent = WorldInit(config)

    // Write files
    Directory.writeFile(regionPath, regionContent)
    Directory.writeFile(worldPath, worldContent)

    log(LogLevel.SUCCESS, 'Server configuration completed successfully!');
}