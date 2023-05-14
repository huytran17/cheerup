import mongoose from "mongoose";
import { get } from "lodash";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    hash_password: { type: String, trim: true },
    full_name: { type: String, trim: true },
    type: {
      type: String,
      trim: true,
      emum: ["super", "normal"],
      default: "normal",
    },
    is_auto_censorship_post: { type: Boolean, default: false },
    is_blocked: { type: Boolean, default: false },
    avatar: { type: Object },
    email: { type: String, trim: true, lowercase: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
  },
  {
    toJSON: { virtuals: true },
  }
);

adminSchema.index({ created_at: -1 });

adminSchema.virtual("avatar_url").get(function () {
  return get(this, "avatar.location");
});

adminSchema.plugin(mongoose_lean_virtuals);

export default adminSchema;
