import {
  error404Handler,
  errorHandler,
  errorPrismaHandler,
} from './middleware/errorMiddleware.js';

import dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

// Initialize Express
const app = express();
const SERVER_PORT = parseInt(process.env.SERVER_PORT || '3000');
const __dirname = fileURLToPath(new URL('.', import.meta.url)); // 👈 추가

// Middleware
app.use('/public', express.static(path.join(__dirname, '..', 'public'))); // Serve static files from the 'public' directory
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
  console.log(`server started at : http://localhost:${SERVER_PORT}`);
});
