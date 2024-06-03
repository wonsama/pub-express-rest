import { NODE_ENV, ROOT_DIR, SERVER_PORT } from './config/config.js';
import { error404Handler, errorHandler } from './middleware/errorMiddleware.js';

import { errorPrismaHandler } from './middleware/prismaMiddleware.js';
import express from 'express';
import path from 'path';
import userRoutes from './routes/userRoutes.js';

// Initialize Express
const app = express();

// Middleware
app.use('/public', express.static(path.join(ROOT_DIR, '..', 'public'))); // Serve static files from the 'public' directory
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies (for form data)
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies (for API requests, upload json data with a limit of 10mb)

// Routes
app.use('/api/user', userRoutes);

// Middleware - Error
app.use(errorPrismaHandler);
app.use(error404Handler);
app.use(errorHandler);

// Start Server
app.listen(SERVER_PORT, () => {
  console.log(`NODE_ENV: ${NODE_ENV}`);
  console.log(`server started at : http://localhost:${SERVER_PORT}`);
});
