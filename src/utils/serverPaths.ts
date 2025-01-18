import { ROOT_PATH } from "../config/config";
import { terminateProcess } from "./childProcess";
import path from "node:path";
import fs from "node:fs";

interface IFile {
    [key: string]: IFile | string[] | undefined;
    files?: string[];
}

/**
 * Returns the directory structure of a given directory.
 * @param dirPath - The path of the directory to retrieve the structure of.
 * @returns An object representing the directory structure.
 */
async function getDirectoryStructure(dirPath: string): Promise<IFile>  {
    const result: IFile = {};
    try {
        const items = await fs.promises.readdir(dirPath, { withFileTypes: true });
        for (const item of items) {
            if (item.isDirectory()) {
                result[item.name] = await getDirectoryStructure(path.join(dirPath, item.name))
            } else {
                if (!result.files) {
                    result.files = [];
                }
                result.files.push(item.name);
            }
        }
    } catch (error) {
        return { files: [`Error reading directory ${dirPath}: ${(error as Error).message}`] };
    }
    
    return result;
}

/**
 * Ensures that a directory exists. If it does not, it creates it.
 * @param dirPath - The path of the directory to check or create.
 */
function ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

/**
 * Generates and returns the paths for the server, region, and world for a given server.
 * @param gridName - The name of the server grid.
 * @returns An object containing the serverPath, regionPath, and worldPath.
 */
export function getServerPaths(gridName: string) {
    ensureDirectoryExists(ROOT_PATH);

    const serverPath = path.join(ROOT_PATH, gridName);
    const regionPath = path.join(serverPath, "bin", "Regions", "RegionConfig.ini");
    const worldPath = path.join(serverPath, "bin", "config-include", "MyWorld.ini");

    return { serverPath, regionPath, worldPath };
}

// funcion para eliminar el path por si falla la clonacion o alguna parte del progreso 

/**
 * Checks if a server exists and returns its name and path.
 * @param gridName - The name of the server grid.
 * @returns An object containing the gridName and serverPath, or a message if the server does not exist.
 */
export function findOneServer(gridName: string) {
    const { serverPath } = getServerPaths(gridName);

    if (!fs.existsSync(serverPath)) {
        return { message: `The server ${gridName} does not exist.` };
    }

    return { gridName, serverPath };
}

/**
 * Returns a list of all servers in the root directory.
 * @returns An array of objects containing the gridName and serverPath, or a message if an error occurs.
 */
export function getServers() {
    try {
        ensureDirectoryExists(ROOT_PATH);

        return fs.readdirSync(ROOT_PATH).map((gridName) => ({
            gridName,
            serverPath: getServerPaths(gridName).serverPath,
        }));
    } catch (error) {
        return { message: (error as Error).message };
    }
}

/**
 * Returns the content of a specific file in a given server.
 * @param gridName - The name of the server grid.
 * @param fileName - The name of the file to retrieve.
 * @returns An object containing the file content, or a message if the file or server does not exist.
 */
export function getServerFile(gridName: string, fileName: string) {
    const { serverPath } = getServerPaths(gridName);

    if (!fs.existsSync(serverPath)) {
        return { message: `The server ${gridName} does not exist.` };
    }

    const filePath = path.join(serverPath, fileName);

    if (!fs.existsSync(filePath)) {
        return { message: `File ${fileName} does not exist in server ${gridName}.` };
    }

    try {
        const content = fs.readFileSync(filePath, "utf8");
        return { content };
    } catch (error) {
        return { message: (error as Error).message };
    }
}

/**
 * Returns the directory structure of a given server.
 * @param gridName - The name of the server grid.
 * @returns An object representing the directory structure, or a message if the server does not exist.
 */
export function getServerFiles(gridName: string) {
    const { serverPath } = getServerPaths(gridName);

    if (!fs.existsSync(serverPath)) {
        return { message: `The server ${gridName} does not exist.` };
    }

    return getDirectoryStructure(serverPath);
}



/**
 * Deletes a given server. If the process is busy or lacks permissions, it attempts to terminate the process before deleting the server.
 * @param gridName - The name of the server grid.
 * @returns A message indicating the result of the deletion.
 */
export function deleteServer(gridName: string) {
    const { serverPath } = getServerPaths(gridName);

    if (!fs.existsSync(serverPath)) {
        return { message: `The server ${gridName} does not exist.` };
    }

    try {
        fs.rmSync(serverPath, { recursive: true });
        return { message: "Server deleted." };
    } catch (error: any) {
        if (error.code === "EBUSY" || error.code === "EPERM") {
            terminateProcess(serverPath);
            fs.rmSync(serverPath, { recursive: true });
            return { message: "Process terminated. Server deleted." };
        } else {
            return { message: error.message };
        }
    }
}

