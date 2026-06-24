import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";

class DeliveryController {
  public async getAssignedJobs(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const jobs = await Order.find({ deliveryRiderId: req.user!.id }).populate("userId");
      res.status(200).json(jobs);
    } catch (error) {
      next(error);
    }
  }

  public async updateJobStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params; // order id
      const { status } = req.body; // pending, assigned, completed, cancelled, etc.

      if (!status) {
        res.status(400).json({ message: "Status is required" });
        return;
      }

      // Check if order belongs to this delivery rider
      const order = await Order.findOne({ _id: id, deliveryRiderId: req.user!.id });
      if (!order) {
        res.status(404).json({ message: "Assigned job not found for this rider" });
        return;
      }

      order.status = status;
      await order.save();

      res.status(200).json({ message: "Job status updated successfully", order });
    } catch (error) {
      next(error);
    }
  }
}

export default new DeliveryController();
