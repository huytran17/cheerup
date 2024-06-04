import mongoose, { Model } from "mongoose";
import { get } from "lodash";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import ISystemConfiguration from "../interfaces/system-configuration";

const Schema = mongoose.Schema;

const systemConfigurationSchema = new Schema<
  ISystemConfiguration,
  Model<ISystemConfiguration>
>(
  {
    is_blocked_comment: { type: Boolean, default: false },
    thumbnail: { type: Object },
    folder_icon: { type: Object },
    owner: {
      name: { type: String, default: "" },
      description: { type: String, default: "" },
      avatar: { type: Object },
    },
    excel_template: [
      {
        name: { type: String, default: "" },
        path: { type: String, default: "" },
        uploaded_at: { type: Date, default: Date.now() },
        uploaded_by: { type: Schema.Types.ObjectId, ref: "Admin" },
        mimetype: { type: String, default: "" },
        size: { type: Number, default: 0 },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

systemConfigurationSchema.index({ created_at: -1 });

systemConfigurationSchema.virtual("owner_avatar_url").get(function () {
  return get(this, "owner.avatar.path");
});

systemConfigurationSchema.virtual("thumbnail_url").get(function () {
  return get(this, "thumbnail.path");
});

systemConfigurationSchema.virtual("folder_icon_url").get(function () {
  return get(this, "folder_icon.path");
});

systemConfigurationSchema.plugin(mongoose_lean_virtuals);

export default systemConfigurationSchema;
