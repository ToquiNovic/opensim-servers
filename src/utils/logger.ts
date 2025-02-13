import { ApiStatusServer } from "./api";

export enum LogLevel {
    INFO = 'INFO',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    WARNING = 'WARNING'
}

export enum Status {
    CREATING_SERVER = 'CREATING_SERVER',
    CLONING_REPOSITORY = 'CLONING_REPOSITORY',
    REPOSITORY_CLONED = 'REPOSITORY_CLONED',
    CREATING_DATABASE = 'CREATING_DATABASE',
    DATABASE_CREATED = 'DATABASE_CREATED',
    SERVER_CREATED = 'SERVER_CREATED',
    CONFIGURING_SERVER = 'CONFIGURING_SERVER', 
    WRITTIN_FILES = 'WRITTIN_FILES',
    SERVER_CONFIGURATION_COMPLETED = 'SERVER_CONFIGURATION_COMPLETED',
    ERROR_CREATING_SERVER = 'ERROR_CREATING_SERVER',
}

const colors: { [key in LogLevel]: string } = {
    [LogLevel.INFO]: '\x1b[36m',
    [LogLevel.SUCCESS]: '\x1b[32m',
    [LogLevel.ERROR]: '\x1b[31m',
    [LogLevel.WARNING]: '\x1b[33m'
};

interface IOptions {
    server?: string
    state?: Status
    message?: string
}

export async function log(level: LogLevel, message: string, optinalParams: IOptions = {}) {
    const { server, state } = optinalParams
    if (server) {
        await ApiStatusServer(server, state ?? '')
    }

    console.log(`${colors[level]}[%s]\x1b[0m`, level, message, ...(optinalParams.message ? [optinalParams.message] : []));
}