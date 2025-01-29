import Directory from "../../utils/directory";
import DBService from '../../utils/dataBase'
import { CustomError, BadRequestError } from "../../middlewares/global-errors";
import { log, LogLevel } from "../../utils/logger";
import { GitClone } from "./git";


interface ICreateServerService {
    gridName: string,
    dataBaseName: string
}

export async function CreateServerService({ gridName, dataBaseName }: ICreateServerService) {
    log(LogLevel.INFO, 'Creating server', gridName);
    const { serverPath } = Directory.getRootPath(gridName)

    if (await DBService.check(dataBaseName)) {
        throw new BadRequestError(`Database ${dataBaseName} already exists`);
    }

    if (Directory.checkExists(serverPath)) {
        throw new BadRequestError(`Server with grid name ${gridName} already exists`);
    }

    try {
        log(LogLevel.INFO, 'Cloning repository...')
        const repository = await GitClone(serverPath);
        if (repository.Status !== "Success") {
            throw new CustomError(repository.Message, 500);
        }
        log(LogLevel.SUCCESS, 'Repository cloned successfully!')

        log(LogLevel.INFO, 'Creating database...')
        await DBService.create(dataBaseName);
        log(LogLevel.SUCCESS, 'Database created successfully!')
        log(LogLevel.SUCCESS, 'Server created successfully!')

        return repository;
    } catch (error) {
        throw new CustomError(`Error creating server: ${(error as Error).message}`, 500);
    }
}