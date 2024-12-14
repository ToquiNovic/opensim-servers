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

    exe.execSync(`git clone ${GitConfig.repository} ${targetPath}`, { stdio: 'inherit' }) // clone the repository
    return {
        "Message": `The repository  ${GitConfig.repository} was successfully cloned`,
        "Status": "Success",
        "Path": targetPath
    }
}