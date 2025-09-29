//tag model
import { model, Schema } from "mongoose";

const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 30,
    },
    description: {
      type: String,
      maxlength: 200,
    },
  },
  {
    timestamps: true,
  }
);

export const TagsModel = model("Tags", tagSchema);
