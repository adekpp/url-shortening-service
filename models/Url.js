import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema(
  {
    urlId: { type: String, required: true },
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, unique: true },
    accessCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Url", UrlSchema);
