//comment model
import { model, Schema, Types } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      minlenght: 5,
      maxlenght: 500,
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    article: [
      {
        type: Types.ObjectId,
        ref: "Articles",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const CommentModel = model("Comments", commentSchema)