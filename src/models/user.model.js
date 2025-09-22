//model user
import { model, Schema } from "mongoose";

const profileSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  biography: {
    type: String,
    maxlenght: 500,
  },
  avatarUrl: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
});

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 3,
      maxlength: 20,
    },

    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "El correo electrónico no es válido"],
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
    profile: profileSchema,
  },
  {
    timestamps: true,
  }
);

export const UserModel = model("Users", userSchema);
