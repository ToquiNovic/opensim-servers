import { GitConfig } from "../config/config"
import exe from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'

export async function CloneRepository(targetPath: string) {
    if (!fs.existsSync(targetPath)) { // Ensure the target oath exist
        fs.mkdirSync(path.dirname(targetPath), { recursive: true })
    } else {
        return { "Message": `The server ${targetPath} already exist` }
    }

    try {
        const parts = targetPath.split('\\');
        const lastTwoLevels = parts.slice(-2).join('/');
        console.log(`git clone ${GitConfig.repository} ../${lastTwoLevels}`)
        exe.execSync(`git clone ${GitConfig.repository} ../${lastTwoLevels}`) // clone the repository
        return {
            "Message": `The repository  ${GitConfig.repository} was successfully cloned`,
            "Status": "Success",
            "Path": targetPath
        }
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(`Error git cloning repository: ${err.message}`)
        } else {
            throw err
        }
    }

}

export function terminateProcess(serverPath: string) {
    try {
        const command = process.platform === 'win32'
            ? `wmic process where "ExecutablePath like '${serverPath}%' and not ExecutablePath like '%wmic%'" delete`
            : `pkill -f ${serverPath}`;
        exe.execSync(command);
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(`Error terminating process: ${err.message}`)
        } else {
            throw err
        }
    }
}