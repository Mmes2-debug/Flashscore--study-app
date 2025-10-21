import mongoose, { Schema, Document } from "mongoose";

export interface INews extends Document {
  title: string;
  content: string;
  author: string;
  publishedAt: Date;
}

const NewsSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  publishedAt: { type: Date, default: Date.now }
});

export const News = mongoose.models.News || mongoose.model<INews>("News", NewsSchema);
export default News; // dual export ✅