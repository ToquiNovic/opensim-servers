import { exec, spawn } from "node:child_process";
import { log, LogLevel } from "./logger";


// Funciona 
export async function execute(command: string, directory: string): Promise<string> {
    log(LogLevel.WARNING, `Executing command`)
    const options = { cwd: directory }
    return new Promise((resolve, reject) => {
        exec(command, options, (error, stdout, stderr) => {
            if (error) {
                log(LogLevel.ERROR, `Error executing command: ${error.message}`)
                reject(new Error(`Error executing command: ${stderr}`))
            } else {
                resolve(stdout)
            }
        })
    })
}

export function spawnn(command: string, directory: string): void{
    try {
        const process = spawn('cmd.exe', ['/c', 'start', 'cmd.exe', '/k', command], {
            cwd: directory,
            detached: true,
            stdio: 'ignore'
        });
        process.unref(); // Unreference the child process so the parent can exit independently of the child 
    } catch (error) {
        log(LogLevel.ERROR, `Error executing command: ${error instanceof Error ? error.message : error}`)
    }
}

export async function killProcess(directory: string) {
    log(LogLevel.WARNING, `Killing process: ${directory}`)
    try {
        const command = process.platform === 'win32'
            ? `wmic process where "ExecutablePath like '${directory}%' and not ExecutablePath like '%mic%'" delete`
            : `pkill -f ${directory}`;
        await execute(command, directory)
    } catch (error) {
        if (error instanceof Error) {
            log(LogLevel.ERROR, `Error killing process: ${error.message}`)
            throw new Error(`Error killing process: ${error.message}`)
        }
    }
}
