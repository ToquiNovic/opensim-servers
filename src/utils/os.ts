import os from 'node:os'

export const getIp = () => {
    const networkInterfaces = os.networkInterfaces()
    if (networkInterfaces["Ethernet"]) {
        const address = getIPv4(networkInterfaces["Ethernet"])
        if (address) { return address }
    } else if (networkInterfaces["Wi-Fi"]) {
        const address = getIPv4(networkInterfaces["Wi-Fi"])
        if (address) { return address }
    }
    return "127.0.0.0"
}

function getIPv4(interfaces: os.NetworkInterfaceInfo[]) {
    for (const netInterface of interfaces) {
        if (netInterface.family === 'IPv4') {
            return netInterface.address
        }
    }
    return null
}