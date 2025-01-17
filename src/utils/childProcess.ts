import { GitConfig } from "../config/config"
import {exec} from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'


/**
 * Executes a shell command in a given directory.
 * @param command - The command to execute.
 * @param directory - The directory in which to execute the command.
 * @returns The result of the command execution as a string.
 */
export async function executeCommand(command: string, directory: string): Promise<string> {
    const options = { cwd: directory };
    return new Promise((resolve, reject) => {
        exec(command, options, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(`Error executing command: ${stderr}`));
            } else {
                resolve(stdout);
            }
        });
    });
}

/**
 * Clones a Git repository to a target path.
 * @param targetPath - The path where the repository should be cloned.
 * @returns An object containing a message, status, and path.
 */
export async function CloneRepository(targetPath: string) {
    if (fs.existsSync(targetPath)) {
        return { Message: `The server ${targetPath} already exists` };
    }

    fs.mkdirSync(path.dirname(targetPath), { recursive: true });

    try {
        const parts = targetPath.split(path.sep);
        const lastTwoLevels = parts.slice(-2).join(path.sep);
        console.log(`git clone ${GitConfig.repository} ../${lastTwoLevels}`)
        await executeCommand(`git clone ${GitConfig.repository} ../${lastTwoLevels}`, path.dirname(targetPath));
        return {
            "Message": `The repository ${GitConfig.repository} was successfully cloned`,
            "Status": "Success",
            "Path": targetPath
        };
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(`Error git cloning repository: ${err.message}`)
        } else {
            throw err
        }
    }
}

/**
 * Terminates a process running from a specific server path.
 * @param serverPath - The path of the server whose process should be terminated.
 * @throws An error if the process termination fails.
 */
export async function terminateProcess(serverPath: string) {
    try {
        const command = process.platform === 'win32'
            ? `wmic process where "ExecutablePath like '${serverPath}%' and not ExecutablePath like '%wmic%'" delete`
            : `pkill -f ${serverPath}`;
        await executeCommand(command, process.cwd());
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(`Error terminating process: ${err.message}`)
        } else {
            throw err
        }
    }
}