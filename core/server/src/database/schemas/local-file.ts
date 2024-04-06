import mongoose, { Model } from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import ILocalFile from "../interfaces/local-file";

const Schema = mongoose.Schema;

const localFileSchema = new Schema<ILocalFile, Model<ILocalFile>>(
  {
    filename: { type: String, required: true },
    originalname: { type: String, required: true },
    encoding: { type: String, required: true },
    mimetype: { type: String, required: true },
    destination: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
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

localFileSchema.index({ created_at: -1 });

localFileSchema.plugin(mongoose_lean_virtuals);

export default localFileSchema;
