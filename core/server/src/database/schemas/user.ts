import mongoose from "mongoose";
import _ from "lodash";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    geo: { type: String, trim: true },
    hash_password: { type: String, trim: true },
    full_name: { type: String, trim: true },
    is_blocked_comment: { type: Boolean, default: false },
    blocked_comment_at: { type: Date },
    avatar: { type: Object },
    email: { type: String, trim: true, lowercase: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
    email_verified_at: { type: Date, default: null },
    created_by: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  {
    toJSON: { virtuals: true },
  }
);

userSchema.index({ created_at: -1 });

userSchema.virtual("avatar_url").get(function () {
  return _.get(this, "avatar.meta.location");
});

userSchema.virtual("is_email_verified").get(function () {
  const email_verified_at = _.get(this, "email_verified_at");
  return !!email_verified_at && !_.isNil(email_verified_at);
});

userSchema.plugin(mongoose_lean_virtuals);

export default userSchema;
