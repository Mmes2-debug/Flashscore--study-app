// safeSeed.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import Author from "../models/NewsAuthor.js";
import News from "../models/News.js";
import Prediction from "../models/Predictions.js";
import User from "../models/User.js";

const MONGO_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

const safeSeed = async () => {
  try {
    // Ensure default authors exist
    const defaultAuthors = [
      { name: "Admin", email: "admin@example.com", role: "admin" },
      { name: "Editor", email: "editor@example.com", role: "editor" },
    ];

    for (const authorData of defaultAuthors) {
      const existing = await Author.findOne({ email: authorData.email });
      if (!existing) {
        await Author.create(authorData);
        console.log(`➕ Created author: ${authorData.name}`);
      }
    }

    // Ensure default admin user exists
    const adminEmail = "admin@example.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({ name: "Admin", email: adminEmail });
      console.log(`➕ Created default admin user`);
    }

    // Optionally, create default news articles if none exist
    const newsCount = await News.countDocuments();
    if (newsCount === 0) {
      const authors = await Author.find();
      await News.create([
        {
          title: "Welcome to MagajiCo News!",
          content: "This is the first article for members and guests.",
          author: authors[0]._id,
          isActive: true,
        },
      ]);
      console.log("➕ Created default news article");
    }

    console.log("🎉 Safe seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error in safe seed:", err);
    process.exit(1);
  }
};

connectDB().then(safeSeed);