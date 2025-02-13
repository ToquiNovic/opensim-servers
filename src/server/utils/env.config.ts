import { DataServerDto } from "../server.dto";
import { PvtoConfig } from "../../config/config";

export function EnvConfig(data: DataServerDto): string {
    const opensimDir = `${data.dataSource}/bin`

    return `
# OPENSIM PATH
OPEN_SIM_DIR= ${opensimDir}
OPEN_SIM_EXECUTABLE= OpenSim.exe

# API CONFIG
FASTAPI_HOST= 0.0.0.0
FASTAPI_PORT= ${data.pvtoPort ? data.pvtoPort : 5000}
# UA3D CREDENTIALS
UA3D_USER = ${PvtoConfig.user}
UA3D_PASS = ${PvtoConfig.pass}
UA3D_BACK = ${PvtoConfig.url}
ID_SERVER = ${data.id}
    `
}
