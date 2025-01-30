import { object, string, TypeOf } from "zod";

export const CreateServerSchema = object({
    body: object({
        port: string({
            required_error: 'Port is required'
        }),
        regionName: string({
            required_error: 'Region Name is required'
        }),
        uuid: string({
            required_error: 'UUID is required'
        }),
        coordinates: string({
            required_error: 'Coordinates is required'
        }),
        ip: string({
            required_error: 'IP is required'
        }),
        gridName: string({
            required_error: 'Grid Name is required'
        }),
        dataBaseName: string({
            required_error: 'Database Name is required'
        }),
        dataBaseHost: string().optional(),
        dataBaseUser: string().optional(),
        dataBasePassword: string().optional(),
    })
})

export type CreateServerInput = TypeOf<typeof CreateServerSchema>