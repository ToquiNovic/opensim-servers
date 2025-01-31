import os from 'node:os'

export const getOs = () => {
    return os.networkInterfaces()
}