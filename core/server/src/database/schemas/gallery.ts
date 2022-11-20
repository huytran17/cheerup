import mongoose from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";

const Schema = mongoose.Schema;

const gallerySchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    parent: { type: Schema.Types.ObjectId, ref: "Gallery" },
    items: [{ type: Object }],
    created_by: { type: Schema.Types.ObjectId, ref: "Admin" },
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
