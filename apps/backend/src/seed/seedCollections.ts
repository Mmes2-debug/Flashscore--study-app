import mongoose, { Types } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// ✅ Named imports from model files
import { NewsAuthor } from "../models/NewsAuthor.js";
import { News } from "../models/News.js";
import { Prediction } from "../models/Predictions.js";
import { User } from "../models/User.js";

// Interfaces for type safety
interface Author {
  name: string;
  email: string;
  role: string;
}

interface UserType {
  name: string;
  email: string;
}

interface Article {
  title: string;
  content: string;
  author: Types.ObjectId;
}

interface PredictionType {
  game: string;
  prediction: string;
  author: Types.ObjectId;
}

// Ensure MONGO_URI exists
const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) throw new Error("MONGODB_URI not set in environment");

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

// Seed function
const seedData = async () => {
  try {
    // Clear existing data
    await NewsAuthor.deleteMany();
    await News.deleteMany();
    await Prediction.deleteMany();
    await User.deleteMany();

    // Seed authors
    const authors: Author[] = await NewsAuthor.insertMany([
      { name: "John Doe", email: "john@example.com", role: "admin" },
      { name: "Jane Smith", email: "jane@example.com", role: "editor" },
    ]);

    // Seed users
    const users: UserType[] = await User.insertMany([
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
    ]);

    // Seed news/articles
    const articles: Article[] = await News.insertMany([
      { title: "First Article", content: "Hello World!", author: authors[0]._id },
      { title: "Second Article", content: "Testing...", author: authors[1]._id },
    ]);

    // Seed predictions
    const predictions: PredictionType[] = await Prediction.insertMany([
      { game: "Team A vs Team B", prediction: "Team A wins", author: authors[0]._id },
    ]);

    console.log("🎉 Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
};

// Run seeding
connectDB().then(seedData);