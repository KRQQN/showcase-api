import express from "express";
import sequelize from "./db/sequelize/sequelizeConnection";
import apiRouter from "./routes/apiRoutes";
import { exceptionHandler } from "./middlewares/exceptionHandler";
import { asyncHandler } from "./middlewares/asyncHandler";
import { ErrorRequestHandler } from "express-serve-static-core";
import cors from "cors";
import path from "path";
import corsOptions from "./config/cors";

const app = express();
(async () => {
  await sequelize.authenticate();
})();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", asyncHandler(apiRouter));
app.use(express.static(path.join(__dirname, "../../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

app.use(exceptionHandler as ErrorRequestHandler);

export default app;
