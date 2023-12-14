import app from "./app";
import { dbConnect } from "./db";
import router from "./routes";

const PORT = 3000;
dbConnect();
app.use(router);
app.listen(PORT);
console.log(`Server is listening on port: ${PORT}`);
