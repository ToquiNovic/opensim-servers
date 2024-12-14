import path from 'node:path'
import 'dotenv/config'

export const ROOT_PATH = path.resolve(__dirname, '../../../servers/')

export const GitConfig = {
    repository: process.env.GIT_REPOSITORY,
    branch: process.env.GIT_BRANCH,
}