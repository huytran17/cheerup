import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subscribeSchema = new Schema(
  {
    is_active: { type: Boolean, default: true },
    user: [{ type: Schema.Types.ObjectId, ref: "User" }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
  },
  {
    toJSON: { virtuals: true },
  }
);

export default subscribeSchema;
