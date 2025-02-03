import { regionConfig, WorldInit } from "../utils";
import { CustomError } from "../../middlewares/global-errors";
import { CreateServerDto } from "../server.dto";
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

function writeFile(filePath: string, content: string) {
    try {
        fs.writeFileSync(filePath, content);
        log(LogLevel.INFO, `File written: ${filePath}`);
    } catch (error) {
        throw new CustomError(`Error writing file: ${filePath}, ${(error as Error).message}`, 500);
    }
}

export function ConfigServer(config: CreateServerDto) {
    log(LogLevel.INFO, 'Configuring server', config.gridname);
    // Path
    const { serverPath, regionPath, worldPath } = Directory.getRootPath(config.gridname)

    // Create server folder
    createDirectoryIfNotExist(serverPath)

    // Create region and world files
    createDirectoryIfNotExist(regionPath)
    createDirectoryIfNotExist(worldPath)

    // Create region and world files
    const regionContent = regionConfig(config)
    const worldContent = WorldInit(config)

    // Write files
    writeFile(regionPath, regionContent)
    writeFile(worldPath, worldContent)

    log(LogLevel.SUCCESS, 'Server configuration completed successfully!');

    return { regionPath, worldPath }
}