import express from "express";
import sequelize from "./db/sequelize/sequelizeConnection";
import apiRouter from "./routes/apiRoutes";
import { exceptionHandler } from "./middlewares/exceptionHandler";
import { asyncHandler } from "./middlewares/asyncHandler";
import { ErrorRequestHandler } from "express-serve-static-core";
import cors from "cors";
import path from "path";

const app = express();
(async () => {
  await sequelize.authenticate();
})();

// CORS configuration
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    console.log("Received origin:", origin);
    console.log("NODE_ENV:", process.env.NODE_ENV);

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log("Allowing request with no origin");
      callback(null, true);
      return;
    }

    const allowedOrigins =
      process.env.NODE_ENV === "production"
        ? ["http://frontend"]
        : ["http://localhost", "http://localhost:80", "http://localhost:3001"];

    console.log("Allowed origins:", allowedOrigins);

    if (allowedOrigins.includes(origin)) {
      console.log("Origin allowed:", origin);
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Accept"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", asyncHandler(apiRouter));

// Serve static files from the client build directory
app.use(express.static(path.join(__dirname, "../../client/dist")));

// Handle client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

app.use(exceptionHandler as ErrorRequestHandler);

export default app;
