import { CreateServerDto, DataServerDto } from "../server.dto";
import { ApiGetPvto, getIp } from "../../utils";
import { DBConfig } from "../../config/config";
import { randomUUID } from 'node:crypto'
import Directory from "../../utils/directory";

export const assembleSubmissionData =  async (data: CreateServerDto): Promise<DataServerDto> => {
    const { serverPath } = Directory.getRootPath(data.gridName)
    const user =DBConfig.USER
    const pass = DBConfig.PASS
    const uuid = randomUUID();
    const pvto = await ApiGetPvto()
    const url = `http://${getIp()}:${pvto}`

    return {
        id: '',
        uuid : uuid,
        pvtoPort: pvto,
        port: data.port,
        gridName: data.gridName,
        urlHost: url,
        dataSource: serverPath,
        dataBaseName: `ua3d_${data.gridName}`,
        dataBaseUser: user,
        dataBasePassword: pass,
    } as DataServerDto;
}

