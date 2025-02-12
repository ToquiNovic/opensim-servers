export class CreateServerDto {
    constructor(
        public port: number,
        public gridName: string,
    ) {}
}

export class DataServerDto {
    constructor(
        public id: string,
        public uuid: string,
        public gridName: string,
        public port: number,
        public pvtoPort: number,
        public urlHost: string,
        public dataSource: string,
        public dataBaseName: string,
        public dataBaseUser: string,
        public dataBasePassword: string
    ) {}
}

export class SearchFileDto {
    constructor(
        public gridName: string,
        public filename: string,
    ) {}
}