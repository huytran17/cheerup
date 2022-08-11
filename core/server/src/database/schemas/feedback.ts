import mongoose from "mongoose";

const Schema = mongoose.Schema;

const feedbackSchema = new Schema(
  {
    title: { type: String, trim: true },
    created_by: [{ type: Schema.Types.ObjectId, ref: "User" }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
  },
  {
    toJSON: { virtuals: true },
  }
);

export default feedbackSchema;
