import "dotenv/config";
import app from "./src/server";

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});