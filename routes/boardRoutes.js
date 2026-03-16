// GET /boards
// protect · find boards where owner or member is req.user
// POST /boards
// protect · create board with owner=req.user
// GET /boards/:id
// protect · populate lists → populate cards (sorted by position)
// PATCH /boards/:id
// protect · owner only · update title or background
// DELETE /boards/:id
// protect · owner only · delete board + cascade delete lists + cards
// POST /boards/:id/members
// protect · add user by email to members array
import exp from "express"
import { BoardModel } from "../models/Board.js"
import { verifyToken } from "../middleware/verifyToken.js"
export const boardRouter=exp.Router()
boardRouter.get('/boards',verifyToken,async(req,res)=>{
    const boards=await BoardModel.findOne(req.user.userId)
    return res.status(200).json({message:"sucessful",paylaod:boards})

})

