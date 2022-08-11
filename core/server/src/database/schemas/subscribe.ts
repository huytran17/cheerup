import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subscribeSchema = new Schema(
  {
    email: { type: String, trim: true, required: true },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
  },
  {
    toJSON: { virtuals: true },
  }
);

export default subscribeSchema;
