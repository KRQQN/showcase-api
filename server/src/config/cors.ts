import { CorsOptions } from "cors";

const allowedOrigins = [
  "http://192.168.1.16:3001",
  "http://localhost:3001",
  "http://ec2-51-20-78-38.eu-north-1.compute.amazonaws.com",
  "http://ec2-51-20-78-38.eu-north-1.compute.amazonaws.com:3000",
  "http://ec2-51-20-78-38.eu-north-1.compute.amazonaws.com:3001",
  "https://rkdev.me",
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked origin: ${origin}`));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Accept"],
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
