import { exec, ChildProcessWithoutNullStreams, spawn } from "node:child_process";
import { log, LogLevel } from "./logger";

const consoles: { [Key: string]: ChildProcessWithoutNullStreams } = {}

// funciona 
export function spawConsole(command: string, dir: string) { 
    log(LogLevel.INFO, `Executing command:  ${command} in directory: ${dir}`);
    try {

        const child = spawn('cmd.exe', ['/c', `start cmd.exe /k "cd /d ${dir} && ${command}"`], {
            shell: true,
            detached: true,
            stdio: 'pipe'
        })
    
        child.on('data', (data) => {
            console.log('Data: ', data)
        })
    
        child.on('exit', (code) => {
            console.log('Exit: ', code)
        })
    
        return child.stdio
    } catch (error) {
        throw new Error(`Error executing command: ${ error instanceof Error ? error.message : error}`)
    }
}


export async function execute(command: string, directory: string): Promise<string> {
    const options = { cwd: directory }
    return new Promise((resolve, reject) => {
        exec(command, options, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(`Error executing command: ${stderr}`))
            } else {
                resolve(stdout)
            }
        })
    })

}

export async function killProcess(serverPath: string) {
    try {
        const command = process.platform === 'win32'
            ? `wmic process where "ExecutablePath like '${serverPath}%' and not ExecutablePath like '%mic%'" delete`
            : `pkill -f ${serverPath}`;
        await execute(command, serverPath)
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error killing process: ${error.message}`)
        }
    }
}
