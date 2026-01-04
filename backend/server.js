import express from "express";
import dotenv from "dotenv";
// Import the database connection function
import { connectDb } from "./config/dbConnection.js";
import mainRoute from "./routes/index.route.js";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Disable ETag to avoid 304 caching responses in dev
app.set("etag", false);

// Global no-store to force fresh responses
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(
  cors({
    origin: ["http://localhost:5173"], // frontend URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//access to http://localhost:5173/

app.use("/v1", mainRoute);
// Health check
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Get port and host from environment variables or use defaults
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0";

// Start the server
// Connect to the database before starting the server
app.listen(PORT, HOST, async () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);

  // Connect to the database
  await connectDb();
});
