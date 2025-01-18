import { DBConfig } from "../config/config";
import { executeCommand } from "./childProcess";

export async function createDatabase(dbName: string) {
    try {
        await executeCommand(`mysql -u ${DBConfig.USER} -p"${DBConfig.PASS}" -e "CREATE DATABASE ${dbName};"`, DBConfig.BIN_PATH)
        return "Database created successfully";
    } catch (error) {
        if (error instanceof Error) {
            throw Error(`Error creating database: ${error.message}`)
        } else {
            throw error
        }
    }
}

export async function checkDatabase(dbName: string): Promise<boolean> {
    try {
        const result = await executeCommand(`mysql -u ${DBConfig.USER} -p"${DBConfig.PASS}" -e "SHOW DATABASES LIKE '${dbName}';"`, DBConfig.BIN_PATH)
        return result.includes(dbName)
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error checking database: ${error.message}`)
        } else {
            throw error
        }
    }

}

//! consultar usuarios de la base de datos especifica. 

export async function dropDatabase(dbName: string) {
    try {
        await executeCommand(`mysql -u ${DBConfig.USER} -p"${DBConfig.PASS}" -e "DROP DATABASE ${dbName};"`, DBConfig.BIN_PATH)
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error dropping database: ${error.message}`)
        } else {
            throw error
        }
    }
}
