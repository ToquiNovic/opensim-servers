
import { BadRequestError } from '../../middlewares/global-errors'
import Directory from '../../utils/directory'
import DbService from '../../utils/dataBase'

export async function DeleteServer(gridName: string) {
    try {
        // Finalice the server process
        const serverPath = Directory.isDirectory(gridName)
        console.log(serverPath)

        // Delete the server directory
        const dir = await Directory.delete(gridName)

        console.log("Servicio eliminar server despues de la funcion de dir")

        if (!dir) {
            throw new BadRequestError(`Server not delete: ${gridName}`)
        }

        if (dir.dbname) {
            console.log(dir.dbname)
            DbService.drop(dir.dbname)
        }

        return { message: `Server ${gridName} deleted successfully.` }
    } catch (error) {
        throw new BadRequestError(`Error: ${(error as Error).message}`)
    }
}
