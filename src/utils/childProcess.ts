import { exec, ChildProcessWithoutNullStreams, spawn } from "node:child_process";
import { log, LogLevel } from "./logger";

const consoles: { [Key: string]: ChildProcessWithoutNullStreams } = {}
// const consoles: { [key: string]: { pid: number, process: ChildProcessWithoutNullStreams } } = {};


// funciona 
export function spawConsole(command: string, dir: string, responses: string[] = []) { 
    log(LogLevel.INFO, `Executing command:  ${command} in directory: ${dir}, responses ${responses}`);
    try {
        return new Promise((resolve, reject) => {

            const child = spawn('cmd.exe', ['/c', `start cmd.exe /k "cd /d ${dir} && ${command}"`], {
                shell: true,
                detached: false, 
                stdio: ['pipe', 'pipe', 'pipe'] 
            })
        
            consoles[dir] = child
            let index = 0; // Índice para controlar el orden de respuestas

            child.stdout.on('data', (data) => {
                console.log(data.toString());
                // Si hay respuestas disponibles, las enviamos en orden
                if (index < responses.length) {
                    setTimeout(() => {
                        console.log(`Respondiendo: ${responses[index]}`);
                        child.stdin.write(responses[index] + '\n'); // Enviar la respuesta con Enter
                        index++; // Pasar a la siguiente respuesta
                    }, 1000); // Pequeño retraso para evitar problemas
                }
            })

            child.stderr.on('data', (data) => {
                console.error('Error:', data.toString());
                reject(new Error(data.toString()));
            });

            child.on('close', (code) => {
                resolve(`Proceso finalizado con código ${code}`);
            });

            child.on('error', (error) => {
                console.error('Error:', error);
                reject(error);
            });
        })
    } catch (error) {
        throw new Error(`Error executing command: ${ error instanceof Error ? error.message : error}`)
    }
} 

export function spawnn(command: string, dir: string) {
    try {
        const process =  spawn(command, [] , {cwd: dir, shell: true, stdio: 'pipe'})
        process.stdout.on('data', (data) => {

            process.stdin.write(' \n')
            console.log("Stdout")
            console.log(data.toString())
        })

    } catch (error) {
        console.error(error)
    }
}

// Funciona 
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
