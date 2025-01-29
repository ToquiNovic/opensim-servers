import { DBConfig } from "../config/config";
import { CustomError } from "../middlewares/global-errors";
import { execute } from "./childProcess";

class DBService {
    async create(dbName: string) {
        try {
            const command = `mysql -u ${DBConfig.USER} -p"${DBConfig.PASS}" -e "CREATE DATABASE ${dbName};"`
            await execute(command, DBConfig.BIN_PATH)
            return { message: `Database ${dbName} created successfully.` }
        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(`Error creating database: ${error.message}`, 500);
            }
        }
    }

    async check (dbName: string): Promise<boolean> {
        try {
            const command = `mysql -u ${DBConfig.USER} -p"${DBConfig.PASS}" -e "SHOW DATABASES LIKE '${dbName}';"`
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
            const command = `mysql -u ${DBConfig.USER} -p"${DBConfig.PASS}" -e "DROP DATABASE ${dbName};"`
            await execute(command, 'src/utils')
        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(`Error deleting database: ${error.message}`, 500);
            }
        }
    }
}

export default new DBService()