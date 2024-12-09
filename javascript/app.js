const fs = require('fs');
const path = require('path');
const { regionConfig } = require('./region_config');
const { myWorldInit } = require('./my_world_init');

function generateRegionFile(server, regionName, uuid, coordinates, port, ip, gridName, dbHost, dbName, dbUsername, dbPassword) {
    const regionPathFile = `./${server}/Regions/RegionConfig.ini`;
    const worldPathFile = `./${server}/Regions/MyWorld.ini`;

    fs.mkdirSync(path.dirname(regionPathFile), { recursive: true });
    fs.mkdirSync(path.dirname(worldPathFile), { recursive: true });

    const regionContent = regionConfig(regionName, uuid, coordinates, port);
    const worldContent = myWorldInit(ip, port, gridName, dbHost, dbName, dbUsername, dbPassword);

    fs.writeFileSync(regionPathFile, regionContent);
    fs.writeFileSync(worldPathFile, worldContent);

    console.log(`Region File created: ${regionPathFile}`);
    console.log(`World File created: ${worldPathFile}`);
}

function parseArgs() {
    const args = process.argv.slice(2);
    const parsedArgs = {
        server: 'DefaultServer',
        region_name: 'DefaultRegion',
        uuid: '00000000-0000-0000-0000-000000000000',
        coordinates: '0,0',
        port: 9000,
        ip: '127.0.0.1',
        grid_name: 'DefaultGrid',
        db_host: 'localhost',
        db_name: 'opensim',
        db_username: 'opensim',
        db_password: 'opensim'
    };

    args.forEach((arg, index) => {
        if (arg.startsWith('--')) {
            const key = arg.slice(2);
            const value = args[index + 1];
            if (parsedArgs.hasOwnProperty(key)) {
                parsedArgs[key] = value;
            }
        }
    });

    return parsedArgs;
}

const args = parseArgs();

generateRegionFile(
    args.server,
    args.region_name,
    args.uuid,
    args.coordinates,
    args.port,
    args.ip,
    args.grid_name,
    args.db_host,
    args.db_name,
    args.db_username,
    args.db_password
);