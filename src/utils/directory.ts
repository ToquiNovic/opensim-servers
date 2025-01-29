import { CustomError, NotFoundError } from '../middlewares/global-errors'
import { ROOT_PATH } from '../config/config'
import path from 'node:path'
import fs from 'node:fs'

interface IFile {
    [Key: string]: IFile | string[] | undefined,
    files?: string[]
}

/**
 * Recursively reads the directory structure.
 * @param dir - The directory path.
 * @returns A promise that resolves to the directory structure.
 */
async function DirectoryStructure(dir: string): Promise<IFile> {
    const result: IFile = {}
    try {
        const items = await fs.promises.readdir(dir, { withFileTypes: true })
        for (const item of items) {
            if (item.isDirectory()) {
                result[item.name] = await DirectoryStructure(path.join(dir, item.name))

            } else {
                if (!result.files) {
                    result.files = []
                }
                result.files.push(item.name)
            }
        }
        return result
    } catch (error) {
        throw new CustomError(`Error reading directory ${dir}: ${(error as Error).message}`, 500);
    }
}

class Directory {
    /**
     * Gets the root path and related paths.
     * @param dir - The directory name.
     * @returns An object containing the server, region, and world paths.
     */
    getRootPath(dir: string) {
        this.checkExists(ROOT_PATH)

        const serverPath = path.join(ROOT_PATH, dir)
        const regionPath = path.join(serverPath, "bin", "Regions", "RegionConfig.ini");
        const worldPath = path.join(serverPath, "bin", "config-include", "MyWorld.ini");

        return { serverPath, regionPath, worldPath }
    }

    /**
    * Gets all servers.
    * @returns An array of server objects or an error message.
    */
    getServers() {
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

    /**
     * Gets a server by grid name.
     * @param gridName - The grid name.
     * @returns An object containing the grid name and server path or an error message.
     */
    getServerByGridName(gridName: string) {
        const { serverPath } = this.getRootPath(gridName)
        if (!fs.existsSync(serverPath)) {
            throw new NotFoundError("Server not found");
        }

        return { gridName, serverPath }
    }

    /**
     * Gets all files in a server.
     * @param gridName - The grid name.
     * @returns A promise that resolves to the directory structure or an error message.
     */
    async getServerFiles(gridName: string) {
        const { serverPath } = this.getRootPath(gridName)

        if (!fs.existsSync(serverPath)) {
            throw new NotFoundError("Server not found");
        }

        return await DirectoryStructure(serverPath)
    }

    /**
     * Gets a specific file in a server.
     * @param gridName - The grid name.
     * @param file - The file name.
     * @returns An object containing the file content or an error message.
     */
    searchServerFile(gridName: string, file: string) {
        const { serverPath } = this.getRootPath(gridName)
        const filePath = path.join(serverPath, file)

        if (!fs.existsSync(serverPath)) {
            throw new NotFoundError("Server not found");
        }

        if (!fs.existsSync(filePath)) {
            throw new NotFoundError("File not found");
        }

        try {
            const content = fs.readFileSync(filePath, 'utf8')
            return { content }
        } catch (error) {
            throw new CustomError(`Error reading file ${filePath}: ${(error as Error).message}`, 500);
        }
    }

    delete(dir: string) {
        return `Delete server by gridName ${dir}`;
    }

    /**
     * Checks if a directory exists, and creates it if it doesn't.
     * @param dir - The directory path.
     */
    checkExists(dir: string) {
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
}

export default new Directory();