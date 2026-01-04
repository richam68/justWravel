import dotenv from "dotenv";
dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  dbUri: process.env.DB_URI || "mongodb://localhost:27017/justWravel",
  frontendUrl: process.env.FRONTEND_URL,
};

export default config;
