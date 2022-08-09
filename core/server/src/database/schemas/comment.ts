import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: String, trim: true },
  created_by: { type: Schema.Types.ObjectId, ref: "Admin" },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  children: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  meta: {
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

export default commentSchema;
