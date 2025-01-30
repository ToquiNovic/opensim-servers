import path from 'node:path'
import 'dotenv/config'

export const ROOT_PATH = path.resolve(__dirname, '../../../servers/')

export const PORT = process.env.PORT || 3000

export const Opensim = {
    DB_USER: process.env.OPENSIM_DB_USER,
    DB_PASS: process.env.OPENSIM_DB_PASS,
    DB_HOST: process.env.OPENSIM_DB_HOST,
}

export const GitConfig = {
    repository: process.env.GIT_REPOSITORY,
    branch: process.env.GIT_BRANCH,
}

export const DBConfig = {
    BIN_PATH: path.resolve(process.env.DB_BIN_PATH || '/usr/bin/mysql'),
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASSWORD
}