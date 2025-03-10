
import { BadRequestError } from '../../middlewares/global-errors'
import Directory from '../../utils/directory'
import DbService from '../../utils/dataBase'

export async function DeleteServer(gridName: string) {
    try {
        // Finalice the server process
        const serverPath = Directory.isDirectory(gridName)
        // await killProcess(5031) 
        // puerto pvto/kill
        console.log(serverPath)

        // Delete the server directory
        const dir = Directory.delete(gridName)

        if (!dir) {
            throw new BadRequestError(`Server not delete: ${gridName}`)
        }

        if (dir.dbname) {
            DbService.drop(dir.dbname)
        }

        return { message: `Server ${gridName} deleted successfully.` }
    } catch (error) {
        throw new BadRequestError(`Error deleting server: ${(error as Error).message}`)
    }
}
