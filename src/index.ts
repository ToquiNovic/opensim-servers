import app from "./app";
import { PORT } from "./config/config";

const port = PORT

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});