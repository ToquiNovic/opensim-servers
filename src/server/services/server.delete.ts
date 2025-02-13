
import { BadRequestError } from '../../middlewares/global-errors'
import Directory from '../../utils/directory'
import DbService from '../../utils/dataBase'
import { killProcess } from '../../utils'

export async function DeleteServer(gridName: string) {
    try {
        // Finalice the server process
        const serverPath = Directory.isDirectory(gridName)
        await killProcess(serverPath)

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
