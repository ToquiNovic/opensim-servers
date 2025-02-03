import { PORT } from "./config/config";
import app from "./server";
import { getIp } from "./utils/os";

const ip = getIp();

app.listen(PORT, () => {
    console.log(`\n🚀 Server is running on: \n
    ➜ Local: \x1b[32mhttp://localhost:${PORT}\x1b[0m
    ➜ Network: \x1b[32mhttp://${ip}:${PORT}\x1b[0m`);
});