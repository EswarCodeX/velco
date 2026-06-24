import type { Request, Response, NextFunction } from "express";
import ActionLog from "../models/ActionLog.js";
import type { AuthRequest } from "./authMiddleware.js";

export const actionLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // Only log if the method is not GET to keep logs relevant to state changes
  if (req.method === "GET") {
    return next();
  }

  const start = performance.now();

  // We bind to the 'finish' event so we can capture the final status code
  res.on("finish", async () => {
    try {
      const duration = Math.round(performance.now() - start);
      const authReq = req as AuthRequest;

      const logEntry = new ActionLog({
        method: req.method,
        endpoint: req.originalUrl || req.url,
        userId: authReq.user?.id,
        statusCode: res.statusCode,
        responseTime: duration,
        error: res.locals.error, // Captured from errorHandler
      });

      await logEntry.save();
    } catch (error) {
      console.error("Failed to save action log:", error);
    }
  });

  next();
};
