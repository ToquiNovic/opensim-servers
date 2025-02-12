import { number, object, string, TypeOf } from "zod";

export const CreateServerSchema = object({
    body: object({
        port: number({
            required_error: 'Port is required'
        }),
        gridName: string({
            required_error: 'Grid Name is required'
        }),
        dataBaseName: string().optional(),
        coordinates: string().optional(),
        dataBaseHost: string().optional(),
        dataBaseUser: string().optional(),
        dataBasePassword: string().optional(),
    })
})

export type CreateServerInput = TypeOf<typeof CreateServerSchema>