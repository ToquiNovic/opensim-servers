def region_config(region_name, uuid, coordinates, port):
 
 content = f"""
; ### Zorra

; * Regions configuration file
; * This is Your World

[{region_name}]
RegionUUID = {uuid}
Location = {coordinates}
SizeX = 512
SizeY = 512
InternalAddress = "0.0.0.0"
InternalPort =  {port}
AllowAlternatePorts = False
ExternalHostName = "127.0.0.1"


; *
; * Prim data
; * This allows limiting the sizes of prims and the region prim count
; *

; NonphysicalPrimMax = 256
; PhysicalPrimMax = 64
; ClampPrimSize = False
; MaxPrims = 15000
; MaxAgents = 100
""" 
 return content
   