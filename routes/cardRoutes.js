// CARD ROUTES
import express from "express";
import { CardModel } from "../models/Card.js";
import { ListModel } from "../models/List.js";
import { ActivityModel } from "../models/Activity.js";

export const cardRouter = express.Router();
//Create a Card POST /api/cards
cardRouter.post("/", async (req, res) => {
  try {
    const { title, description, listId, position } = req.body;
    const newCard = new CardModel({ title, description, listId, position });
    const savedCard = await newCard.save();
    // Create an activity log for card creation
    await ActivityModel.create({
      type: "Card Created",
        userId: req.user._id,
        cardId: savedCard._id
    });
    res.status(201).json(savedCard);
  } catch (error) {
    res.status(500).json({ error: "Failed to create card" });
  }
});
// Read all cards by list GET /api/cards/:listId
cardRouter.get("/:listId", async (req, res) => {
  try {
    const { listId } = req.params;
    const cards = await CardModel.find({ listId }).sort({ position: 1 });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cards" });
  } 
});
// Update a Card PUT /api/cards/:id
cardRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;  
    const { title, description, position } = req.body;
    const updatedCard = await CardModel.findByIdAndUpdate(
      id,
      { title, description, position },
      { new: true }
    );
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ error: "Failed to update card" });
  }
});
    
// DELETE /api/cards/:id