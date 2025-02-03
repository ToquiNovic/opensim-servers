export class CreateServerDto {
    constructor(
        public port: string,
        public gridname: string,
        public coordinates: string,
        public dataBaseHost: string,
        public dataBaseName: string,
        public dataBaseUser: string,
        public dataBasePassword: string,
    ) {}
}

export class SearchFileDto {
    constructor(
        public gridname: string,
        public filename: string,
    ) {}
}