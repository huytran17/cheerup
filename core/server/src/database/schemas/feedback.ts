import mongoose from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";

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

feedbackSchema.plugin(mongoose_lean_virtuals);

export default feedbackSchema;
