import mongoose, { Schema, type Document } from "mongoose";

export interface IActionLog extends Document {
  method: string;
  endpoint: string;
  userId?: mongoose.Types.ObjectId;
  statusCode: number;
  responseTime?: number;
  error?: string;
  createdAt: Date;
}

const actionLogSchema = new Schema<IActionLog>(
  {
    method: { type: String, required: true },
    endpoint: { type: String, required: true, index: true },
    userId: { type: Schema.Types.ObjectId, index: true },
    statusCode: { type: Number, required: true, index: true },
    responseTime: { type: Number },
    error: { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

actionLogSchema.index({ createdAt: 1 });

export default mongoose.model<IActionLog>("ActionLog", actionLogSchema);
