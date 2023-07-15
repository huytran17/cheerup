import mongoose from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";

const Schema = mongoose.Schema;

const twoFactorAuthenticationSchema = new Schema(
  {
    email: { type: String, required: true },
    code: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    expire_at: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

twoFactorAuthenticationSchema.index({ created_at: -1 });

twoFactorAuthenticationSchema.plugin(mongoose_lean_virtuals);

export default twoFactorAuthenticationSchema;
