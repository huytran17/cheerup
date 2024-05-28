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
    avatar: { type: Object },
    email: { type: String, trim: true, lowercase: true },
    login_failed_times: { type: Number, default: 0 },
    is_online: { type: Boolean, default: false },
    last_online_at: { type: Date, default: null },
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

adminSchema.index({ created_at: -1, email: 1 });

adminSchema.virtual("avatar_url").get(function () {
  return get(this, "avatar.path");
});

adminSchema.plugin(mongoose_lean_virtuals);

export default adminSchema;
