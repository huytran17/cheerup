import mongoose from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";

const Schema = mongoose.Schema;

const emailVerificationSchema = new Schema(
  {
    email: { type: String, trim: true, required: true },
    verification_code: { type: String, default: "" },
    expire_at: { type: String, default: "" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
  },
  {
    toJSON: { virtuals: true },
  }
);

emailVerificationSchema.index({ created_at: -1 });

emailVerificationSchema.plugin(mongoose_lean_virtuals);

export default emailVerificationSchema;
