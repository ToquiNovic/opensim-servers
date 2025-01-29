import { execute } from "../../utils/childProcess";
import { GitConfig } from "../../config/config";
import { CustomError } from "../../middlewares/global-errors";
import { log, LogLevel } from '../../utils/logger'
import path from "node:path";
import fs from 'node:fs'
 
export async function GitClone(dir: string) {
    try {
        const parts = dir.split(path.sep);
        const lastTwoLevels = parts.slice(-2).join(path.sep);
        const command = `git clone ${GitConfig.repository} ../${lastTwoLevels}`;
        log(LogLevel.INFO, 'Execute command:', command);
        await execute(command, path.dirname(dir))
        return {
            "Message": `Repository ${GitConfig.repository} cloned successfully`,
            "Status": "Success",
            "Path": dir
        }
    } catch (error: any) {
        if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true });
        }
        throw new CustomError(`Error cloning repository: ${error.message}`, 500);
    }
}