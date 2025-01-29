export enum LogLevel {
    INFO = 'INFO',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    WARNING = 'WARNING'
}

const colors: { [key in LogLevel]: string } = {
    [LogLevel.INFO]: '\x1b[36m',
    [LogLevel.SUCCESS]: '\x1b[32m',
    [LogLevel.ERROR]: '\x1b[31m',
    [LogLevel.WARNING]: '\x1b[33m'
};

export function log(level: LogLevel, message: string, ...optionalParams: any[]) {
    console.log(`${colors[level]}[%s]\x1b[0m`, level, message, ...optionalParams);
}