//article model
import { model, Schema, Types } from "mongoose";

const Schema = new Schema(
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
      ref: "user",
      required: true,
    },
    tags: [
      {
        type: Types.ObjectId,
        ref: "tags",
        required: true,
      },
    ],
  },
  {
    timestamps: true
  }
);
