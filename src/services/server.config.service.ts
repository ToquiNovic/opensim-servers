import { regionConfig, WorldInit, getServerPaths } from "../utils";
import path from 'node:path'
import fs from 'node:fs'

interface ConfigServerProps {
    //* common
    port?: string;
    //* region config
    regionName: string;
    uuid: string;
    coordinates: string;
    //* config world
    ip: string;
    gridName: string;
    dataBaseHost?: string;
    dataBaseName: string;
    dataBaseUser: string;
    dataBasePassword: string;
}


function createDirectoryIfNotExists(directoryPath: string) {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(path.dirname(directoryPath), { recursive: true });
    }
}

function writeFile(filePath: string, content: string) {
    fs.writeFileSync(filePath, content);
}

export function ConfigServer(config: ConfigServerProps) {
    // paths 
    const { serverPath, regionPath, worldPath } = getServerPaths(config.gridName);

    // create server folder
    createDirectoryIfNotExists(serverPath);

    // create region and world folder if not exists
    createDirectoryIfNotExists(regionPath);
    createDirectoryIfNotExists(worldPath);

    // create region and world files
    const regionContent = regionConfig(config);
    const worldContent = WorldInit(config);

    // write files
    writeFile(regionPath, regionContent);
    writeFile(worldPath, worldContent);

    return { regionPath, worldPath };
}