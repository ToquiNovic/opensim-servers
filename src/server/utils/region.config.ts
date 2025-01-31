interface RegionProps {
    gridname: string;
    coordinates: string;
    port?: string;
}

const uuid = "00000000-0000-0000-0000-000000000000";

export function regionConfig({gridname, coordinates = "2431,2338", port = "9000"}: RegionProps) {
    return `
; ### Region ${gridname}

; * Regions configuration file
; * This is Your World

[${gridname}]
RegionUUID = ${uuid}
Location = "${coordinates}"
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