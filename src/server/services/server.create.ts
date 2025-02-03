import Directory from "../../utils/directory";
import DBService from '../../utils/dataBase'
import { CustomError, BadRequestError } from "../../middlewares/global-errors";
import { log, LogLevel, Status} from "../../utils/logger";
import { GitClone } from "./git";


interface ICreateServerService {
    gridname: string,
    dataBaseName: string
}

export async function CreateServerService({ gridname, dataBaseName }: ICreateServerService) {
    log(LogLevel.INFO, 'Creating server', {server: gridname, state: Status.CREATING_SERVER});
    const { serverPath } = Directory.getRootPath(gridname)

    if (await DBService.check(dataBaseName)) {
        throw new BadRequestError(`Database ${dataBaseName} already exists`);
    }

    if (Directory.checkExists(serverPath)) {
        throw new BadRequestError(`Server with grid name ${gridname} already exists`);
    }

    try {
        log(LogLevel.INFO, 'Cloning repository', {server: gridname, state: Status.CLONING_REPOSITORY});
        const repository = await GitClone(serverPath);
        if (repository.Status !== "Success") {
            throw new CustomError(repository.Message, 500);
        }
        log(LogLevel.SUCCESS, 'Repository cloned successfully!', {server: gridname, state: Status.REPOSITORY_CLONED});

        log(LogLevel.INFO, 'Creating database', {server: gridname, state: Status.CREATING_DATABASE});
        await DBService.create(dataBaseName);
        log(LogLevel.SUCCESS, 'Database created successfully!', {server: gridname, state: Status.DATABASE_CREATED});
        log(LogLevel.SUCCESS, 'Server created successfully!', {server: gridname, state: Status.SERVER_CREATED});

        return repository;
    } catch (error) {
        throw new CustomError(`Error creating server: ${(error as Error).message}`, 500);
    }
}