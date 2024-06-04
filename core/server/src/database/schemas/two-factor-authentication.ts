import mongoose, { Model } from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import ITwoFactorAuthentication, {
  TwoFAType,
} from "../interfaces/two-factor-authentication";

const Schema = mongoose.Schema;

const twoFactorAuthenticationSchema = new Schema<
  ITwoFactorAuthentication,
  Model<ITwoFactorAuthentication>
>(
  {
    email: { type: String, required: true },
    code: { type: String, trim: true, required: true },
    type: {
      type: String,
      enum: TwoFAType,
      trim: true,
      required: true,
    },
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

twoFactorAuthenticationSchema.index({ created_at: -1, email: 1, code: 1 });

twoFactorAuthenticationSchema.plugin(mongoose_lean_virtuals);

export default twoFactorAuthenticationSchema;
