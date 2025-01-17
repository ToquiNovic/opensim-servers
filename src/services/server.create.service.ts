import { getServerPaths, CloneRepository, checkDatabase, createDatabase } from "../utils"
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

        await createDatabase(dataBaseName)
        return await CloneRepository(serverPath)
    } catch (error) {
        throw Error(`Error creating server: ${error}`)
    }
}