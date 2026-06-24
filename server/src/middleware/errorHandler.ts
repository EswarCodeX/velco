import type { Request, Response, NextFunction } from "express";

interface AppErrorInterface {
  statusCode: number;
  message: string;
}
export class AppError extends Error implements AppErrorInterface {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  let message = "Unknown error occurred";
  let statusCode = 500;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  // Attach error to locals for logging middleware to capture
  res.locals.error = message;
  res.status(statusCode).json({ message });
}
