import { Schema, model } from "mongoose";

const ListSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "List title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"]
    },

    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: [true, "Board ID is required"]
    },

    position: {
      type: Number,
      required: true,
      min: [0, "Position cannot be negative"]
    }
  },
  { timestamps: true }
);

export const ListModel = model("List", ListSchema);