import { exec } from "node:child_process";
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

export async function killProcess(serverPath: string) {
    log(LogLevel.WARNING, `Killing process: ${serverPath}`)
    try {
        const command = process.platform === 'win32'
            ? `wmic process where "ExecutablePath like '${serverPath}%' and not ExecutablePath like '%mic%'" delete`
            : `pkill -f ${serverPath}`;
        await execute(command, serverPath)
    } catch (error) {
        if (error instanceof Error) {
            log(LogLevel.ERROR, `Error killing process: ${error.message}`)
            throw new Error(`Error killing process: ${error.message}`)
        }
    }
}
