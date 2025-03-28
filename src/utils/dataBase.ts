import { CustomError } from "../middlewares/global-errors";
import { log, LogLevel, Status } from "./logger";
import { DBConfig } from "../config/config";
import { execute } from "./childProcess";

const mysql = `mysql -u ${DBConfig.USER} -p"${DBConfig.PASS}"`

class DBService {
    async create(dbName: string, id: string) {
        try {
            await log(LogLevel.INFO, 'Creating database', { server: id, state: Status.CREATING_DATABASE });
            const command = `${mysql} -e "CREATE DATABASE ${dbName};"`
            await execute(command, DBConfig.BIN_PATH)
            await log(LogLevel.SUCCESS, 'Database created successfully!', { server: id, state: Status.DATABASE_CREATED });

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
            console.log('Dropping database', dbName)
            const command = `${mysql} -e "DROP DATABASE ${dbName};"`
            console.log(command)
            await execute(command, DBConfig.BIN_PATH)
        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(`Error deleting database: ${error.message}`, 500);
            }
        }
    }
}

export default new DBService()