import { object, string, TypeOf } from 'zod'

export const CreateServerSchema = object({
  body: object({
    port: string({
      required_error: 'Port is required',
    }),
    regionName: string({
      required_error: 'Region name is required',
    }),
    uuid: string({
      required_error: 'Uuid is required',
    }),
    coordinates: string({
      required_error: 'Coordinates is required',
    }),
    ip: string({
      required_error: 'Ip is required'
    }),
    gridName: string({
      required_error: 'Server name is required',
    }),
    dataBaseHost: string({
      required_error: 'Url host is required',
    }),
    dataBaseName: string({
      required_error: 'Database name is required',
    }),
    dataBaseUser: string({
      required_error: 'Database user is required',
    }),
    dataBasePassword: string({
      required_error: 'Database password is required',
    }),
  }),
})

export type CreateServerInput = TypeOf<typeof CreateServerSchema>