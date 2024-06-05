import {
  NODE_ENV,
  ROOT_DIR,
  SERVER_HOST,
  SERVER_PORT,
  SERVER_PROTOCOL,
} from "./config/config.js";
import { authRoutes, roleRoutes, userRoutes } from "./routes/index.js";
import { error404Handler, errorHandler } from "./middleware/errorMiddleware.js";

import { errorPrismaHandler } from "./middleware/prismaMiddleware.js";
import express from "express";
import path from "path";

// Initialize Express
const app = express();

// Middleware
app.use("/public", express.static(path.join(ROOT_DIR, "..", "public"))); // Serve static files from the 'public' directory
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies (for form data)
app.use(express.json({ limit: "10mb" })); // Parse JSON bodies (for API requests, upload json data with a limit of 10mb)

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/role", roleRoutes);

// Middleware - Error
app.use(errorPrismaHandler);
app.use(error404Handler);
app.use(errorHandler);

// Start Server
app.listen(SERVER_PORT, () => {
  console.log(`NODE_ENV: ${NODE_ENV}`);
  console.log(
    `server started at : ${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`
  );
});
