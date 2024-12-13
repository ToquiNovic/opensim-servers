interface ICreateServerService {
    serverName: string
}

export function CreateServerService({ serverName }: ICreateServerService) {
    console.log(`Server ${serverName} created`)
    return "Server creado"
}

