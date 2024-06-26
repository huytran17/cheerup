import mongoose, { Model } from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import IPasswordReset from "../interfaces/password-reset";

const Schema = mongoose.Schema;

const passwordResetSchema = new Schema<IPasswordReset, Model<IPasswordReset>>(
  {
    email: { type: String, required: true },
    security_code: { type: String, required: true },
    expire_at: { type: Date, default: Date.now() },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: {
      createdAt: "created_at",
    },
  }
);

passwordResetSchema.index({ created_at: -1 });

passwordResetSchema.plugin(mongoose_lean_virtuals);

export default passwordResetSchema;
