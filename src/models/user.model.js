//model user
import { model, Schema } from "mongoose";

const userSchema = new Schema({
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
},{
    timestamps: true
});

export const UserModel = model("Users", userSchema);
