import { ROOT_PATH } from "../config/config";
import { terminateProcess } from "./childProcess";
import path from "node:path";
import fs from "node:fs";

interface IFile {
    ".git"?: string[];
    files?: string[];
    bin?: string[];
    WifiPages?: string[];
    [key: string]: any;
}

function ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

export function getServerPaths(gridName: string) {
    ensureDirectoryExists(ROOT_PATH);

    const serverPath = path.join(ROOT_PATH, gridName);
    const regionPath = path.join(serverPath, "bin", "Regions", "RegionConfig.ini");
    const worldPath = path.join(serverPath, "bin", "config-include", "MyWorld.ini");

    return { serverPath, regionPath, worldPath };
}

export function findOneServer(gridName: string) {
    const { serverPath } = getServerPaths(gridName);

    if (!fs.existsSync(serverPath)) {
        return { message: `The server ${gridName} does not exist.` };
    }

    return { gridName, serverPath };
}

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

export function getServerFiles(gridName: string) {
    const { serverPath } = getServerPaths(gridName);

    if (!fs.existsSync(serverPath)) {
        return { message: `The server ${gridName} does not exist.` };
    }

    return getDirectoryStructure(serverPath);
}

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

function getDirectoryStructure(dirPath: string): IFile {
    const result: IFile = {};
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    items.forEach((item) => {
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
