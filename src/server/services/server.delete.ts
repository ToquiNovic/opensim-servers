
import { BadRequestError } from '../../middlewares/global-errors'
import Directory from '../../utils/directory'
import DbService from '../../utils/dataBase'

export async function DeleteServer(gridname: string) {
    try {
       const dir = Directory.delete(gridname)

        if (!dir) {
            throw new BadRequestError(`Server not delete: ${gridname}`)
        } 

        //! Discutir si se pasa el nombre de la base de datos o se extrae del archjivo de configuracion 
        if (dir.dbname) {
            DbService.drop(dir.dbname)
        } 

        return { message: `Server ${gridname} deleted successfully.` }

    } catch (error) {
        throw new BadRequestError(`Error deleting server: ${(error as Error).message}`)
    }
}
