import dotenv from "dotenv";
dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  dbUri: process.env.DB_URI,
  frontendUrl: process.env.FRONTEND_URL,
};

export default config;
