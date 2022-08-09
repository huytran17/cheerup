import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    thumbnail: { type: Object },
    content: { type: String, trim: true },
    author: { type: Schema.Types.ObjectId, ref: "Admin" },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    meta: {
      views: { type: Number, default: 0 },
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

export default postSchema;
