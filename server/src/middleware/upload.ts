import multer from "multer";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { config } from "../config.js";

const uploadDir = path.resolve(process.cwd(), config.uploadDir);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uid = crypto.randomUUID();
    // Replace spaces with hyphens for better URL safety
    const safeName = file.originalname.replace(/\s+/g, '-');
    cb(null, uid + "-" + safeName);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});
