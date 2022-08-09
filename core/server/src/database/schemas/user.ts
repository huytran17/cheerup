import mongoose from "mongoose";
import _ from "lodash";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    hash_password: { type: String, trim: true },
    full_name: { type: String, trim: true },
    aws_avatar: { type: Object },
    email: { type: String, trim: true, lowercase: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
    created_by: [{ type: Schema.Types.ObjectId, ref: "Admin" }],
  },
  {
    toJSON: { virtuals: true },
  }
);

userSchema.virtual("alias_name").get(function (this: { full_name: string }) {
  const matches = this.full_name?.match(/\b(\w)/g); // ['J','S','O','N']

  const acronym = matches?.join(""); // JSON

  return acronym;
});

export default userSchema;
