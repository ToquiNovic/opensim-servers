import { PORT } from "./config/config";
import app from "./server";


app.listen(PORT, () => {
    console.log(`🚀 Server is running on \x1b[32mhttp://localhost:${PORT}\x1b[0m`)
})