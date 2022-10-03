import mongoose from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";

const Schema = mongoose.Schema;

const gallerySchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    items: [
      {
        s3: { type: Object },
      },
    ],
    model_type: { type: String, enum: ["Admin", "User"], required: true },
    created_by: { type: Schema.Types.ObjectId, refPath: "model_type" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
  }
);

gallerySchema.index({ created_at: -1 });

gallerySchema.plugin(mongoose_lean_virtuals);

export default gallerySchema;
