import { exec, spawn } from "node:child_process";
import { log, LogLevel } from "./logger";
import { BadRequestError } from "../middlewares/global-errors";


// Funciona 
export async function execute(command: string, directory: string): Promise<string> {
    log(LogLevel.WARNING, `Executing command`)
    const options = { cwd: directory }
    return new Promise((resolve, reject) => {
        exec(command, options, (error, stdout, stderr) => {
            if (error) {
                log(LogLevel.ERROR, `Error executing command: ${error.message}`)
                reject(new BadRequestError(`Error executing command: ${stderr}`))
            } else {
                resolve(stdout)
            }
        })
    })
}

export function spawnn(command: string, directory: string): void {
    try {
        const process = spawn('cmd.exe', ['/c', 'start', 'cmd.exe', '/k', command], {
            cwd: directory,
            detached: true,
            stdio: 'ignore'
        });
        process.unref(); // Unreference the child process so the parent can exit independently of the child 
    } catch (error) {
        log(LogLevel.ERROR, `Error executing command: ${error instanceof Error ? error.message : error}`)
        throw new BadRequestError(`Error executing command: ${error instanceof Error ? error.message : error}`)
    }
}