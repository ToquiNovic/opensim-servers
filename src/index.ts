import app from "@/app";
import { ROOT_PATH } from "@config/config";

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Root path is ${ROOT_PATH}`);
});