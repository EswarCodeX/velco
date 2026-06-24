import mongoose, { Schema, Document } from "mongoose";
import * as bcrypt from "bcrypt-ts";

export interface IAdmin extends Document {
  name: string;
  mail: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
}

const adminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true },
    mail: { type: String, required: true, unique: true, index: true },
    password: { type: String, select: false, required: true },
  },
  { timestamps: true },
);

// Hash password before saving
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
adminSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<IAdmin>("Admin", adminSchema);
