import { CustomError, NotFoundError } from '../middlewares/global-errors'
import { ROOT_PATH } from '../config/config'
import { KillPvtoServer } from './api'
import path from 'node:path'
import fs from 'node:fs'

function readFileContent(filePath: string) {
    try {
        return fs.readFileSync(filePath, 'utf8')
    } catch (error) {
        throw new CustomError(`Error reading file ${filePath}: ${(error as Error).message}`, 500);
    }
}

function searchServerFile(serverPath: string, file: string) {
    const filePath = path.join(serverPath, file)

    try {
        const content = fs.readFileSync(filePath, 'utf8')
        return { content }
    } catch (error) {
        throw new CustomError(`Error reading file ${filePath}: ${(error as Error).message}`, 500);
    }
}

function extractInfo(content: string, regex: RegExp) {
    try {
        const match = content.match(regex)
        if (match && match[1]) {
            return match[1]
        }
    } catch (error) {
        throw new CustomError(`Error extracting database name ${content}: ${(error as Error).message}`, 500);
    }
}

class Directory {
    getRootPath(dir: string) { // get the root path and related paths
        this.checkExists(ROOT_PATH)

        const serverPath = path.join(ROOT_PATH, dir)
        const regionPath = path.join(serverPath, "bin", "Regions", "RegionConfig.ini");
        const worldPath = path.join(serverPath, "bin", "config-include", "MyWorld.ini");

        return { serverPath, regionPath, worldPath }
    }

    getServers() { // get all servers
        try {
            this.checkExists(ROOT_PATH)
            return fs.readdirSync(ROOT_PATH).map((gridName) => ({
                gridName,
                serverPath: this.getRootPath(gridName).serverPath,
            }))
        } catch (error) {
            throw new CustomError(`Error reading directory ${ROOT_PATH}: ${(error as Error).message}`, 500);
        }
    }

    getServerByGridName(gridName: string) { // get the server by grid name
        const serverPath = this.isDirectory(gridName)
        return { gridName, serverPath }
    }


    getServerFiles(gridName: string) { // get the server files
        const serverPath = this.isDirectory(gridName)

        const myWordlFilePath = path.join(serverPath, 'bin', 'config-include', 'MyWorld.ini')
        const regionFilePath = path.join(serverPath, 'bin', 'Regions', 'RegionConfig.ini')

        const myWorldContent = readFileContent(myWordlFilePath)
        const regionContent = readFileContent(regionFilePath)

        return {
            myWorldFile: {
                path: myWordlFilePath,
                content: myWorldContent
            },
            regionFile: {
                path: regionFilePath,
                content: regionContent
            }
        }
    }

    writeOrUpdateFile(filePath: string, content: string) {
        this.checkExists(path.dirname(filePath)); 
        try {
            fs.writeFileSync(filePath, content);
        } catch (error) {
            throw new CustomError(`Error writing file: ${filePath}, ${(error as Error).message}`, 500);
        }
    }

    async delete(gridName: string) { // delete the server directory
        const serverPath = this.isDirectory(gridName)

        const pvtoFile = searchServerFile(serverPath, 'pvto/.env')
        const dbFile = searchServerFile(serverPath, 'bin/config-include/MyWorld.ini')

        const pvtoPort = extractInfo(pvtoFile.content, /^FASTAPI_PORT=(\d+)$/m) ?? '5000'
        const dbname = extractInfo(dbFile.content, /Database=(.*?);/)

        console.log('paso la primera verificacion');
        // detener el servicio si se esta ejecutando
        await KillPvtoServer(pvtoPort); // Terminal el proceso.

        try {
            console.log('paso la segunda verificacion');
            await fs.promises.rm(serverPath, { recursive: true, force: true });
        } catch (error) {
            console.log("error", error)
            throw new CustomError(`Error deleting directory: ${(error as Error).message}`, 500);
        }

        return { serverPath, dbname, pvtoPort }
    }

    checkExists(dir: string) { // check if the directory exists and create it if it doesn't
        if (!fs.existsSync(dir)) {
            try {
                fs.mkdirSync(dir, { recursive: true });
            } catch (error) {
                throw new CustomError(`Error creating directory ${dir}: ${(error as Error).message}`, 500);
            }
        } else {
            return true;
        }
    }

    isDirectory(path: string): string { // check if the directory exists
        const { serverPath } = this.getRootPath(path)

        if (!fs.existsSync(serverPath)) {
            throw new NotFoundError("Server not found");
        }

        return serverPath
    }
}

export default new Directory();