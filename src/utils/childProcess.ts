import { exec } from "node:child_process";
// import { pid } from "node:process";

// export async function executeConsole(command: string, directory: string) {

// }

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
