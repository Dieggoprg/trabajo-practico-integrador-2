//article model
import { model, Schema, Types } from "mongoose";

const articleSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      minlenght: 3,
      maxlenght: 200,
    },
    content: {
      type: String,
      reuired: true,
      minlenght: 50,
    },
    excerpt: {
      type: String,
      maxlenght: 500,
    },
    status: {
      type: String,
      required: true,
      enum: ["published", "archived"],
      default: "published",
    },
    author: {
      type: Types.ObjectId,
      ref: "Users",
      required: true,
    },
    tags: [
      {
        type: Types.ObjectId,
        ref: "Tags",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ArticlesModel = model("Articles", articleSchema);
