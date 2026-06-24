import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";

class ClientController {
  public async createOrder(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { pickupAddress, dropoffAddress, paymentmethod, items, totalAmount } = req.body;
      
      // Get uploaded files (if any)
      const images: string[] = [];
      if (req.files && Array.isArray(req.files)) {
        req.files.forEach((file: any) => {
          images.push(`/uploads/${file.filename}`);
        });
      } else if (req.file) {
        images.push(`/uploads/${req.file.filename}`);
      }

      const order = new Order({
        userId: req.user!.id,
        items: items || [],
        totalAmount: totalAmount || 0,
        paymentmethod: paymentmethod || "cash",
        pickupAddress,
        dropoffAddress,
        images,
        status: "pending",
      });

      await order.save();
      res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
      next(error);
    }
  }

  public async getOrders(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const orders = await Order.find({ userId: req.user!.id }).populate("deliveryRiderId");
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  public async uploadImages(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file && (!req.files || (Array.isArray(req.files) && req.files.length === 0))) {
        res.status(400).json({ message: "No files uploaded" });
        return;
      }

      const filePaths: string[] = [];
      if (req.files && Array.isArray(req.files)) {
        req.files.forEach((file: any) => {
          filePaths.push(`/uploads/${file.filename}`);
        });
      } else if (req.file) {
        filePaths.push(`/uploads/${req.file.filename}`);
      }

      res.status(200).json({
        message: "Images uploaded successfully",
        filePaths,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ClientController();
