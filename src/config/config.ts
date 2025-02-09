import path from 'node:path'
import 'dotenv/config'

export const ROOT_PATH = path.resolve(__dirname, '../../../servers/')

export const PORT = process.env.PORT || 3000

export const GitConfig = {
    repository: process.env.GIT_REPOSITORY,
    branch: process.env.GIT_BRANCH,
}

export const DBConfig = {
    BIN_PATH: path.resolve(process.env.DB_BIN_PATH || '/usr/bin/mysql'),
    NAME: process.env.DB_NAME || 'ua3d_core',
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || 'root',
    PASS: process.env.DB_PASSWORD || '',
}