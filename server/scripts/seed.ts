import mongoose from "mongoose";
import { config } from "../src/config.js";
import Admin from "../src/models/Admin.js";
import User from "../src/models/User.js";
import Product from "../src/models/Product.js";

async function seed() {
  try {
    console.log("Connecting to database at:", config.MONGODB_URI);
    await mongoose.connect(config.MONGODB_URI);
    console.log("Connected successfully.");

    // 1. Seed Admin
    const existingAdmin = await Admin.findOne({ mail: "admin@astro.com" });
    if (!existingAdmin) {
      const defaultAdmin = new Admin({
        name: "Super Administrator",
        mail: "admin@astro.com",
        password: "adminpassword123", // Automatically hashed by model hooks
      });
      await defaultAdmin.save();
      console.log("✅ Seeded Admin Credentials:");
      console.log("   Email:    admin@astro.com");
      console.log("   Password: adminpassword123");
    } else {
      console.log("ℹ️ Admin admin@astro.com already exists.");
    }

    // 2. Seed Standard User
    const existingUser = await User.findOne({ mail: "user@astro.com" });
    if (!existingUser) {
      const defaultUser = new User({
        name: "Test Customer",
        mail: "user@astro.com",
        phone: "+1555123456",
        password: "userpassword123",
        status: "Active",
      });
      await defaultUser.save();
      console.log("✅ Seeded User Credentials:");
      console.log("   Email:    user@astro.com");
      console.log("   Password: userpassword123");
    } else {
      console.log("ℹ️ User user@astro.com already exists.");
    }

    // 3. Seed Products if empty
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const defaultProducts = [
        {
          name: "Vedic Astral Gemstone Ring",
          price: 249,
          description: "A customized energized yellow sapphire ring tuned to balance Jupiter energies in your birth chart.",
          status: "Active",
          photos: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=60"],
        },
        {
          name: "Personalized Kundli Report (Premium)",
          price: 49,
          description: "Over 80 pages of precise Vedic calculations, planetary alignments, Dashas, and transit forecasts.",
          status: "Active",
          photos: ["https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=500&auto=format&fit=crop&q=60"],
        },
        {
          name: "Rudraksha Mala (108 beads)",
          price: 29,
          description: "Five Mukhi Shiva beads sourced directly from the Himalayas, energized for mental clarity and protection.",
          status: "Active",
          photos: ["https://images.unsplash.com/photo-1596178060810-72cb61274c43?w=500&auto=format&fit=crop&q=60"],
        },
      ];
      await Product.insertMany(defaultProducts);
      console.log("✅ Seeded default astrology products.");
    } else {
      console.log("ℹ️ Products already present in catalog.");
    }

    console.log("Seed script finished successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed database:", error);
    process.exit(1);
  }
}

seed();
