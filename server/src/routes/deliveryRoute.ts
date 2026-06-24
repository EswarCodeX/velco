import {
  Router,
  type Request,
  type Response,
  type NextFunction,
  type RequestHandler,
} from "express";

import deliveryController from "../controllers/deliveryController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

// Protect delivery endpoints
router.use(authenticate as RequestHandler);

// Get all delivery jobs assigned to this rider
router.get(
  "/jobs",
  (req: Request, res: Response, next: NextFunction) =>
    deliveryController.getAssignedJobs(req, res, next),
);

// Update status of a specific delivery job
router.put(
  "/jobs/:id/status",
  (req: Request, res: Response, next: NextFunction) =>
    deliveryController.updateJobStatus(req, res, next),
);

export default router;
