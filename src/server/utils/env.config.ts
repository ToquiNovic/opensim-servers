import { DataServerDto } from "../server.dto";

interface PvtoProps {
    url?: string;
    user?: string;
    pass?: string;
}

export function EnvConfig(data: DataServerDto, pvtoProps: PvtoProps = {}): string {
    const {
        url = 'http://131.100.50.247:3004',
        user = 'pvto.manager',
        pass = 'ADMIN@pvto123'
    } = pvtoProps

    const opensimDir = `${data.dataSource}/bin`

    return `
# OPENSIM PATH
OPEN_SIM_DIR= ${opensimDir}
OPEN_SIM_EXECUTABLE= OpenSim.exe

# API CONFIG
FASTAPI_HOST= 0.0.0.0
FASTAPI_PORT= ${data.pvtoPort ? data.pvtoPort : 5000}
# UA3D CREDENTIALS
UA3D_USER = ${user}
UA3D_PASS = ${pass}
UA3D_BACK = ${url}
ID_SERVER = ${data.id}
    `
}
