import { ROOT_PATH } from "@config/config";
import { regionConfig, WorldInit } from "@/utils";
import path from 'node:path'
import fs from 'node:fs'

interface ConfigServerProps {
    //* common
    port: string;
    //* region config
    regionName: string;
    uuid: string;
    coordinates: string;
    serverName: string;
    //* config world
    ip: string;
    gridName: string;
    dbHost: string;
    dbName: string;
    dbUsername: string;
    dbPassword: string;
}

export function ConfigServer(config : ConfigServerProps) {
    // paths 
    const serverPath = path.join(ROOT_PATH, config.serverName)
    const regionPath = path.join(serverPath, 'region.ini');
    const worldPath = path.join(serverPath, 'world.ini');

    console.log(serverPath, regionPath, worldPath)

    // create server folder
    if (!fs.existsSync(serverPath)) {
        fs.mkdirSync(path.dirname(serverPath), { recursive: true })
    }

    //! create region and world folder if not exists TEMP "revisar configuracion de carpetas"
    if (!fs.existsSync(regionPath) && !fs.existsSync(worldPath)) {
        fs.mkdirSync(path.dirname(regionPath), { recursive: true })
        fs.mkdirSync(path.dirname(worldPath), { recursive: true })
    }

    // create region and world files
    const regionContent = regionConfig(config)
    const worldContent = WorldInit(config)

    // write files
    fs.writeFileSync(regionPath, regionContent);
    fs.writeFileSync(worldPath, worldContent);

    return {regionPath, worldPath}
}