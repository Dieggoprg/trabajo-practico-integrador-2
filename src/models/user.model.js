//model user
import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 3,
      maxlenght: 20,
    },

    email: {
      type: String,
      rquired: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile: {
      firstName: {
        type: String,
        required: true,
        minlenght: 2,
        maxlenght: 50,
      },
    },
    lastName: {
      type: String,
      required: true,
      minlenght: 2,
      maxlenght: 50,
    },
    biography:{
        type: String,
        maxlenght: 500
    },
    avatarUrl: {
        type: String,
    },
    birthDate: {
        type: Date
    }
  },
  {
    timestamps: true,
  }
);

export const UserModel = model("Users", userSchema);
