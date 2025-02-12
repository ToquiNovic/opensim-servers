import { BadRequestError } from '../middlewares/global-errors';
import { DataServerDto } from '../server/server.dto';
import { ApiConfig } from '../config/config';
import axios from 'axios';

const ApiAuthenticate = async () => {
    try {
        const response = await axios.post(`${ApiConfig.url}/auth/signin`, {
            username: ApiConfig.user,
            password: ApiConfig.pass
        });
        return response.data.accessToken;
    } catch (error) {
        throw new BadRequestError(`Error authenticating: ${(error as Error).message}`);
    }
}

export const ApiStatusServer = async (id: string, status: string) => {
    const accessToken = await ApiAuthenticate();
    try {
        const server = await axios.patch(`${ApiConfig.url}/server-status`, { id: id, name: status }, {
            headers: { Authorization: `Bearer ${accessToken}` }
        }).then(res => res.data);

        return server;
    } catch (error) {
        throw new BadRequestError(`Error updating server: ${(error as Error).message}`);
    }
}

export const ApiGetPvto = async (): Promise<number> => {
    const accessToken = await ApiAuthenticate();
    try {
        const servers = await axios.get(`${ApiConfig.url}/servers`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        }).then(res => res.data);

        if (servers.length === 0) {
            return 5000
        }

        const lastSever = servers[0];
        const lastPvtoPort = lastSever.pvtoPort

        if (lastPvtoPort >= 5999) {
            throw new BadRequestError('No available ports');
        }

        return lastPvtoPort + 1;
    } catch (error) {
        throw new BadRequestError(`Error getting server: ${(error as Error).message}`);
    }
}

export const ApiCreateServer = async (data: DataServerDto) => {
    const accessToken = await ApiAuthenticate();
    const body = {
        pvtoPort: data.pvtoPort,
        port: data.port,
        urlHost: data.urlHost,
        gridName: data.gridName,
        dataSource: data.dataSource,
        dataBaseName: data.dataBaseName,
        dataBaseUser: data.dataBaseUser,
        dataBasePassword: data.dataBasePassword
    }

    const server = await axios.post(`${ApiConfig.url}/servers`, body, {
        headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => res.data).catch(err => {
        throw new BadRequestError(`Error creating server: ${err.response.data.message}`)
    });

    return server;
}