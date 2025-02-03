import { DBConfig } from "../config/config";
import { CustomError } from "../middlewares/global-errors";
import { execute } from "./childProcess";

const mysql = `mysql -u ${DBConfig.USER} -p"${DBConfig.PASS}"`
const mysqlDb =`mysql -u ${DBConfig.USER} -p"${DBConfig.PASS}" -D ${DBConfig.NAME}`

async function getStatusId(statusName: string) {
    try {
        const command = `${mysqlDb} -e "SELECT id_serverstatus FROM serverstatus WHERE name_serverstatus = '${statusName}';"`
        const result = await execute(command, DBConfig.BIN_PATH)
        const match = result.match(/(\d+)/)
        if (match) {
            return parseInt(match[1], 10)
        } else {
            throw new CustomError(`Status name ${statusName} not found`, 404)
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new CustomError(`Error getting status ID: ${error.message}`, 500);
        }
    }
}

class DBService {
    async create(dbName: string) {
        try {
            const command = `${mysql} -e "CREATE DATABASE ${dbName};"`
            await execute(command, DBConfig.BIN_PATH)
            return { message: `Database ${dbName} created successfully.` }
        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(`Error creating database: ${error.message}`, 500);
            }
        }
    }

    async check(dbName: string): Promise<boolean> {
        try {
            const command = `${mysql} -e "SHOW DATABASES LIKE '${dbName}';"`
            const result = await execute(command, DBConfig.BIN_PATH)
            return result.includes(dbName)
        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(`Error checking database: ${error.message}`, 500);
            } else {
                throw error;
            }
        }
    }

    async drop(dbName: string): Promise<void> {
        try {
            const command = `${mysql} -e "DROP DATABASE ${dbName};"`
            await execute(command, DBConfig.BIN_PATH)
        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(`Error deleting database: ${error.message}`, 500);
            }
        }
    }

    async logStatus(serverName: string, message: string): Promise<void> {
        try {
            const statusId = await getStatusId(message)
            const command = `${mysqlDb}  -e "UPDATE server SET statusid_server = ${statusId} WHERE id_server = '${serverName}';"`
            await execute(command, DBConfig.BIN_PATH)
        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(`Error logging status: ${error.message}`, 500);
            }
        }
    }
}

export default new DBService()