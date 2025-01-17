
export class CreateServerDto {
    constructor(
        public port: string,
        public regionName: string,
        public uuid: string,
        public coordinates: string,
        public ip: string,
        public gridName: string,
        public dataBaseHost: string,
        public dataBaseName: string,
        public dataBaseUser: string,
        public dataBasePassword: string,
    ) {
    }
}