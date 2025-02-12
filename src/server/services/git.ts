import { CustomError } from "../../middlewares/global-errors";
import { log, LogLevel, Status } from '../../utils/logger'
import { execute } from "../../utils/childProcess";
import path from "node:path";
import fs from 'node:fs'

export async function GitClone(dir: string, id: string , repository: string) {
    log(LogLevel.INFO, 'Cloning repository', { server: id,  state: Status.CLONING_REPOSITORY });
    try {
        const parts = dir.split(path.sep);
        const lastTwoLevels = parts.slice(-2).join(path.sep);
        const command = `git clone ${repository} ../${lastTwoLevels}`;
        log(LogLevel.INFO, 'Execute command:', { message: command });
        await execute(command, path.dirname(dir))
        log(LogLevel.SUCCESS, 'Repository cloned successfully!', { server: id, state: Status.REPOSITORY_CLONED });
        return {
            "Message": `Repository ${repository} cloned successfully`,
            "Status": "Success",
            "Path": dir
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true });
        }
        throw new CustomError(`Error cloning repository: ${error.message}`, 500);
    }
}