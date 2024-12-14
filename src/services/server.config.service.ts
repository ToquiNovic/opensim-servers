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

export function ConfigServer(config: ConfigServerProps) {
    // paths 
    const { serverPath, regionPath, worldPath } = getServerPaths(config.gridName)

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

    return { regionPath, worldPath }
}