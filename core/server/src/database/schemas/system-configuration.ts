import mongoose, { Model } from "mongoose";
import { get } from "lodash";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import ISystemConfiguration, {
  ExcelTemplateType,
} from "../interfaces/system-configuration";

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
        destination: { type: String, default: "" },
        uploaded_at: { type: Date, default: Date.now() },
        uploaded_by: { type: Schema.Types.ObjectId, ref: "Admin" },
        mimetype: { type: String, default: "" },
        size: { type: Number, default: 0 },
        type: { type: String, enum: ExcelTemplateType, default: "" },
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

systemConfigurationSchema.virtual("admin_excel_template_url").get(function () {
  return findExcelTemplate({ doc: this, type: ExcelTemplateType.ADMIN });
});

systemConfigurationSchema.virtual("post_excel_template_url").get(function () {
  return findExcelTemplate({ doc: this, type: ExcelTemplateType.POST });
});

systemConfigurationSchema.virtual("user_excel_template_url").get(function () {
  return findExcelTemplate({ doc: this, type: ExcelTemplateType.USER });
});

systemConfigurationSchema
  .virtual("category_excel_template_url")
  .get(function () {
    return findExcelTemplate({ doc: this, type: ExcelTemplateType.CATEGORY });
  });

systemConfigurationSchema.plugin(mongoose_lean_virtuals);

export default systemConfigurationSchema;

function findExcelTemplate({
  doc,
  type,
}: {
  doc: mongoose.Document;
  type: string;
}) {
  const excel_template = get(doc, "excel_template", []);
  const template = excel_template.find((template) => template.type === type);

  return template?.path;
}
