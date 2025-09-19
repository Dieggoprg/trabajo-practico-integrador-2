//tag model
import { model, Schema } from "mongoose";

const tagSchema = new Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true,
        milenght: 2,
        maxlenght: 30,
    },
    description: {
        type: String,
        maxlenght: 200
    }
  },
  {
    timestamps: true
  }
);

export const TagsModel = model("Tags", tagSchema)
