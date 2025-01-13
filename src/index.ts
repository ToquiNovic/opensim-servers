import app from "./app";
import { PORT } from "./config/config";

const port = PORT

app.listen(port, () => {
  console.log(`Server is running on \x1b[32mhttp://localhost:${port}\x1b[0m`);
});