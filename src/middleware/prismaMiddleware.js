import { PrismaClientInitializationError } from '@prisma/client/runtime';

const prismaErrorMiddleware = (err, req, res, next) => {
  if (err instanceof PrismaClientInitializationError) {
    // Handle PrismaClientInitializationError
    console.error('Failed to initialize Prisma Client:', err.message);
    return res
      .status(500)
      .json({ error: 'Failed to initialize Prisma Client' });
  }

  // Pass the error to the next middleware handler
  next(err);
};
