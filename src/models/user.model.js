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
    maxlength: 500,
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
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

//virtual populate de articulos
userSchema.virtual("articles", {
  ref: "Article",
  localField: "_id", // campo del usuario
  foreignField: "author", // campo del Article que referencia al usuario
});

userSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id", // campo del usuario
  foreignField: "author", // campo comment que referencia al usuario
});

userSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });

  next();
});

// Método para soft delete
userSchema.methods.softDelete = async function () {
  this.deletedAt = new Date();
  await this.save();
};

export const UserModel = model("Users", userSchema);
