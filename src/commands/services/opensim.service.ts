// import { CustomError } from "../../middlewares/global-errors"
import {  spawConsole } from "../../utils/childProcess"


// export async function runOpenSim(dir: string, responses: string[]) {
//     const command = 'opensim.exe'
//     try {
//         const output = await executeConsole(command, dir, responses)
//         console.log(output)
//     } catch (error:any) {
//         throw new CustomError(`Error executing command: ${error.message}`, 500)
//     }

// }

// export function stopOpensim(dir: string) {
//     const direcc = dir + '\\bin'
//     console.log('Stopping opensim',direcc)
//     const command = 'opensim.exe'
//     try {
//         const output = spawConsole(command,direcc)
//         console.log(output)
//     } catch (error) {
//         console.log(error)
//     }
// }

export async function stopOpensim(dir: string) {
    console.log('Stopping opensim',dir)
    const command = 'npm create astro@latest'
    try {
        const output = await spawConsole(command,dir, ['pepe'])
        console.log(output)
    } catch (error) {
        console.log(error)
    }
}