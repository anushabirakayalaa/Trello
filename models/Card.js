import { Schema, model } from "mongoose";

const CardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Card title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"]
    },

    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"]
    },

    listId: {
      type: Schema.Types.ObjectId,
      ref: "List",
      required: [true, "List ID is required"]
    },

    position: {
      type: Number,
      required: true,
      min: [0, "Position cannot be negative"]
    },

    attachments: [
      {
        type: String,
      }
    ]
  },
  { timestamps: true }
);

export const CardModel = model("Card", CardSchema);