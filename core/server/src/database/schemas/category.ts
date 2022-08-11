import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    title: { type: String, trim: true },
    children: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    created_by: [{ type: Schema.Types.ObjectId, ref: "Admin" }],
    thumbnail: { type: Object },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
  },
  {
    toJSON: { virtuals: true },
  }
);

export default categorySchema;
