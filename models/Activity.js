import { Schema, model } from "mongoose";

const ActivitySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"]
    },

    action: {
      type: String,
      required: [true, "Action is required"],
      minlength: [3, "Action must be at least 3 characters"],
      maxlength: [100, "Action cannot exceed 100 characters"]
    },

    cardId: {
      type: Schema.Types.ObjectId,
      ref: "Card",
      required: [true, "Card ID is required"]
    }
  },
  {
    timestamps: true
  }
);

export const ActivityModel = model("Activity", ActivitySchema);