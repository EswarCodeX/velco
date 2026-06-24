import mongoose, { Schema, Document } from "mongoose";
import * as bcrypt from "bcrypt-ts";

export interface IUser extends Document {
  name: string;
  mail: string;
  phone: string;
  password: string;
  status: "Active" | "Inactive";
  role: "client" | "delivery";
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    mail: { type: String, required: true, unique: true, index: true },
    phone: { type: String, required: true },
    password: { type: String, select: false },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    role: {
      type: String,
      enum: ["client", "delivery"],
      default: "client",
    },
  },
  { timestamps: true },
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>("User", userSchema);
