import mongoose from "mongoose";
import { get } from "lodash";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    ip: { type: String, trim: true },
    hash_password: { type: String, trim: true },
    full_name: { type: String, trim: true },
    socialite: {
      provider: { type: String, trim: true },
      access_token: { type: String, trim: true },
      refresh_token: { type: String, trim: true },
    },
    is_blocked_comment: { type: Boolean, default: false },
    blocked_comment_at: { type: Date },
    avatar: { type: Object },
    email: { type: String, trim: true, lowercase: true, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
    created_by: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  {
    toJSON: { virtuals: true },
  }
);

userSchema.index({ created_at: -1 });

userSchema.virtual("avatar_url").get(function () {
  return get(this, "avatar.location");
});

userSchema.plugin(mongoose_lean_virtuals);

export default userSchema;
