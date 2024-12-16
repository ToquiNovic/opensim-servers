import { getServerPaths, CloneRepository } from "../utils"

interface ICreateServerService {
    gridName: string
}

export async function CreateServerService({ gridName }: ICreateServerService) {
    try {
        const { serverPath } = getServerPaths(gridName);
        
        return await CloneRepository(serverPath)
    } catch (error) {
        throw new Error(`Error creating server: ${error}`)
    }
}