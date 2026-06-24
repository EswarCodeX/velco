import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role?: string;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as { id: string; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const authenticateAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  authenticate(req, res, () => {
    if (req.user?.role !== "Admin") {
      res.status(403).json({ message: "Forbidden: Admins only" });
      return;
    }
    next();
  });
};

export const authorizeUserParams = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role === "Admin") {
    next();
    return;
  }
  if (req.user?.id !== req.params.userId) {
    res.status(403).json({ message: "Forbidden: Cannot access other user details" });
    return;
  }
  next();
};
