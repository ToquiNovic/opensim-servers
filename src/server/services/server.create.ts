import { CustomError, BadRequestError } from "../../middlewares/global-errors";
import { log, LogLevel, Status} from "../../utils/logger";
import { GitConfig } from "../../config/config";
import Directory from "../../utils/directory";
import DBService from '../../utils/dataBase'
import { GitClone } from "./git";
import path from 'node:path'

interface ICreateServerService {
    id: string,
    gridName: string,
    dataBaseName: string,
    dataSource: string
}

const Core = GitConfig.Core
const Pvto = GitConfig.Pvto

export async function CreateServerService({ gridName, dataBaseName, dataSource, id }: ICreateServerService) {
   await log(LogLevel.INFO, 'Creating server', {server: id, state: Status.CREATING_SERVER});
    const pvtoPath = path.join(dataSource, 'pvto') // Pvto path

    if (await DBService.check(dataBaseName)) { // Check if database exists
        throw new BadRequestError(`Database ${dataBaseName} already exists`);
    }

    if (Directory.checkExists(dataSource)) { // Check if server exists
        throw new BadRequestError(`Server with grid name ${gridName} already exists`);
    }

    try {
        // Clone Core
        const core = await GitClone(dataSource, id, Core);
        if (core.Status !== "Success") {
            throw new CustomError(core.Message, 500);
        }

        // Clone Pvto
        const pvto = await GitClone(pvtoPath, id, Pvto);
        if (pvto.Status !== "Success") {
            throw new CustomError(pvto.Message, 500);
        }
 
        // Create database
        await DBService.create(dataBaseName, id);
        
        // return server
        await log(LogLevel.SUCCESS, 'Server created successfully!', {server: id, state: Status.SERVER_CREATED});
        return {...core, pvtoPath};
    } catch (error) {
        throw new CustomError(`Error creating server: ${(error as Error).message}`, 500);
    }
}