interface RegionProps {
    regionName: string;
    uuid: string;
    coordinates: string;
    port: string;
}

export function regionConfig({regionName, uuid, coordinates, port}: RegionProps) {
    return `
; ### Region ${regionName}

; * Regions configuration file
; * This is Your World

[${regionName}]
RegionUUID = ${uuid}
Location = ${coordinates}
SizeX = 512
SizeY = 512
InternalAddress = "0.0.0.0"
InternalPort = ${port}
AllowAlternatePorts = False
ExternalHostName = "127.0.0.1"

; *
; * Prim data
; * This allows limiting the sizes of prims and the region prim count
;

; NonphysicalPrimMax = 256
; PhysicalPrimMax = 64
; ClampPrimSize = False
; MaxPrims = 15000
; MaxAgents = 100
`;
}