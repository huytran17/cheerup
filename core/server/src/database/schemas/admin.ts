import mongoose, { Model } from "mongoose";
import { get } from "lodash";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import IAdmin, { AdminType } from "../interfaces/admin";

const Schema = mongoose.Schema;

const adminSchema = new Schema<IAdmin, Model<IAdmin>>(
  {
    hash_password: { type: String, trim: true },
    full_name: { type: String, trim: true },
    type: {
      type: String,
      trim: true,
      emum: AdminType,
      default: AdminType.Editor,
    },
    is_auto_censorship_post: { type: Boolean, default: false },
    is_blocked: { type: Boolean, default: false },
    avatar: { type: Object },
    email: { type: String, trim: true, lowercase: true },
    deleted_at: { type: Date, default: null },
  },
  {
    toJSON: { virtuals: true },
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

adminSchema.index({ created_at: -1 });

adminSchema.virtual("avatar_url").get(function () {
  return get(this, "avatar.location");
});

adminSchema.plugin(mongoose_lean_virtuals);

export default adminSchema;
