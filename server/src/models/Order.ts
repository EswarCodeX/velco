import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  paymentmethod: string;
  status: string;
  deliveryRiderId?: mongoose.Types.ObjectId;
  images?: string[];
  pickupAddress?: string;
  dropoffAddress?: string;
}

const orderItemSchema = new Schema<IOrderItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
});

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true, min: 0 },
    paymentmethod: {
      type: String,
      required: true,
      enum: ["cash", "upi", "card"],
      default: "cash",
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "assigned", "completed", "cancelled"],
      default: "pending",
    },
    deliveryRiderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    images: {
      type: [String],
      default: [],
    },
    pickupAddress: {
      type: String,
    },
    dropoffAddress: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IOrder>("Order", orderSchema);
