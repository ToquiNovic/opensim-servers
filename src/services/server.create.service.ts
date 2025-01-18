import { getServerPaths, CloneRepository, checkDatabase, createDatabase } from "../utils"
import { CustomError } from "../middlewares/global-errors";
import fs from 'node:fs'

interface ICreateServerService {
    gridName: string,
    dataBaseName: string
}

export async function CreateServerService({ gridName, dataBaseName }: ICreateServerService) {
    try {
        const { serverPath } = getServerPaths(gridName);

        // Check if server exists
        if (fs.existsSync(serverPath)) {
            return { Message: `The server ${serverPath} already exists` };
        }

        // Check if the database exists
        if (await checkDatabase(dataBaseName)) {
            return { Message: `The database ${dataBaseName} already exists` };
        }

        // Clone repository
        const repository = await CloneRepository(serverPath) // poner mensajes antes de cada proceso
        if (repository.Status !== 'sucess') {
            return { Message: `Error cloning repository: ${repository.Message}` }
        }

        // create database
        await createDatabase(dataBaseName)

        return repository
    } catch (error) {
        throw Error(`Error creating server: ${error}`)
    }
}