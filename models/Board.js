import { Schema, model } from "mongoose";

const BoardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Board title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"]
    },

    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);

export const BoardModel = model("Board", BoardSchema);