import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, "password is required"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
      ]
    }
  },
  { timestamps: true }
);

export const UserModel = model("User", UserSchema);