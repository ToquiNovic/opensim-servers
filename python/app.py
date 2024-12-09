import os
import argparse
from region_config import region_config
from my_world_init import my_world_init

def generate_region_file(server, region_name, uuid, coordinates, port, ip, grid_name, db_host, db_name, db_username, db_password):
    region_path_file= f"./{server}/Regions/RegionConfig.ini"
    world_path_file= f"./{server}/Regions/MyWorld.ini"
    os.makedirs(os.path.dirname(region_path_file), exist_ok=True)
    os.makedirs(os.path.dirname(world_path_file), exist_ok=True)

    region_content = region_config(region_name, uuid, coordinates, port)
    world_content = my_world_init(ip, port, grid_name, db_host, db_name, db_username, db_password)

    with open(region_path_file, 'w') as archivo:
        archivo.write(region_content)
        
    with open(world_path_file, 'w') as archivo:
        archivo.write(world_content)
    
    print(f"Region File created: {region_path_file}")
    print(f"World File created: {world_path_file}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Generate region and world files.')
    # Reegion args 
    parser.add_argument('--server', default='DefaultServer', help='Server name')
    parser.add_argument('--region_name', default='DefaultRegion', help='Region name')
    parser.add_argument('--uuid', default='00000000-0000-0000-0000-000000000000', help='UUID')
    parser.add_argument('--coordinates', default='0,0', help='Coordinates')
    parser.add_argument('--port', type=int, default='9000', help='Port number')

    # World args
    parser.add_argument('--ip', default='127.0.0.0', help='IP')
    parser.add_argument('--grid_name', default='DefaultGrid', help='Grid name')
    parser.add_argument('--db_host', default='localhost', help='Host')
    parser.add_argument('--db_name', default='opensim', help='DB name')
    parser.add_argument('--db_username', default='opensim', help='DB username')
    parser.add_argument('--db_password', default='opensim', help='DB password')

    # Parse args
    args = parser.parse_args()
    generate_region_file(args.server, args.region_name, args.uuid, args.coordinates, args.port, args.ip, args.grid_name, args.db_host, args.db_name, args.db_username, args.db_password)