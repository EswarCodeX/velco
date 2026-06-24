import mongoose from "mongoose";
import { config } from "./config.js";

class Database {
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(config.MONGODB_URI);
      console.log("Database connected");
    } catch (error) {
      console.error("Database connection error", error);
      process.exit(1);
    }
  }
}

export const database = new Database();
