import { ROOT_PATH } from "../config/config"
import path from 'node:path'
import fs from 'node:fs'

interface IFile {
    ".git": string[];
    files: string[];
    bin: string[];
    WifiPages: string[];
}


export function getServerPaths(gridName: string) { // Get the paths of the server, region and world files
    const serverPath = path.join(ROOT_PATH, gridName);
    const regionPath = path.join(serverPath, 'bin', 'Regions', 'RegionConfig.ini');
    const worldPath = path.join(serverPath, 'bin', 'config-include', 'MyWorld.ini');

    return { serverPath, regionPath, worldPath };
}

export function getServers() { // Get the list of servers
    if (!ROOT_PATH) {
        return []
    }

    return fs.readdirSync(ROOT_PATH).map((gridName) => ({
        gridName,
        serverPath: getServerPaths(gridName).serverPath
        // ...getServerPaths(gridName) // por si se necesitan todas las rutas de los archivos 
    }))
}

export function getServerFile(gridName: string, fileName: string) { // Get the content of a file in the server
    const { serverPath } = getServerPaths(gridName)
    const filePath = path.join(serverPath, fileName)
    return {"ContentFile": fs.readFileSync(filePath, 'utf8')}
}

export function getServerFiles(gridName: string) { // Get the list of files in the server where the gridName is located
    const { serverPath } = getServerPaths(gridName)
    return getDirectoryStructure(serverPath);
}

function getDirectoryStructure(dirPath: string): IFile { // Get the directory structure of the server
    const result: any = {};
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    items.forEach(item => {
        if (item.isDirectory()) {
            result[item.name] = getDirectoryStructure(path.join(dirPath, item.name));
        } else {
            if (!result.files) {
                result.files = [];
            }
            result.files.push(item.name);
        }
    });

    return result;
}