import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

import Author from "../models/NewsAuthor.js";
import Article from "../models/Article.js";
import Prediction from "../models/Prediction.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import Like from "../models/Like.js";
import Subscription from "../models/Subscription.js";

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

const seedData = async () => {
  try {
    // Clear existing data
    await Author.deleteMany();
    await Article.deleteMany();
    await Prediction.deleteMany();
    await Comment.deleteMany();
    await User.deleteMany();
    await Like.deleteMany();
    await Subscription.deleteMany();

    // Seed authors
    const authors = await Author.insertMany([
      { name: "John Doe", email: "john@example.com", role: "admin" },
      { name: "Jane Smith", email: "jane@example.com", role: "editor" },
    ]);

    // Seed users
    const users = await User.insertMany([
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
    ]);

    // Seed articles
    const articles = await Article.insertMany([
      {
        title: "First Article",
        content: "Hello World!",
        author: authors[0]._id,
      },
      {
        title: "Second Article",
        content: "Testing...",
        author: authors[1]._id,
      },
    ]);

    // Seed predictions
    const predictions = await Prediction.insertMany([
      {
        game: "Team A vs Team B",
        prediction: "Team A wins",
        author: authors[0]._id,
      },
    ]);

    // Seed comments
    await Comment.insertMany([
      {
        content: "Great article!",
        article: articles[0]._id,
        user: users[0]._id,
      },
      {
        content: "Interesting!",
        prediction: predictions[0]._id,
        user: users[1]._id,
      },
    ]);

    console.log("🎉 Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
};

connectDB().then(seedData);
