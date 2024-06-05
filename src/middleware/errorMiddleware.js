import { resErrJson } from '../utils/ResponseUtil.js';

/**
 * Handles 404 errors and forwards the error to the next middleware.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next function.
 */
export function error404Handler(req, res, next) {
  const error = new Error('Not Found');
  error.status = 404;

  next(error);
}

/**
 * Handles general errors and sends a JSON response with the error details.
 * @param {Error} err - The error object.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next function.
 */
export function errorHandler(err, req, res, next) {
  resErrJson(res, err.message, err.status || 500);
}
