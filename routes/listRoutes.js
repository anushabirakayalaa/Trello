import {ListModel} from "../models/List.js"
import {CardModel} from "../models/Card.js"
import {BoardModel} from "../models/Board.js"
import exp from "express"
// import { verifyToken } from "./middleware/auth.js"

export const listRouter = exp.Router()

listRouter.post('/addList',async(req,res)=>{
    try{
        const {title,boardId} = req.body
        const newList = new ListModel({title,boardId})
        await newList.save()
        await BoardModel.findByIdAndUpdate(boardId,{$push:{lists:newList._id}})
        res.status(201).json(newList)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})
listRouter.get('/:boardId',async(req,res)=>{
    try{
        
        const {boardId}=req.params
        const lists = await ListModel.find({ boardId })
        .populate("cards")
          res.status(200).json(lists)

    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})
listRouter.delete('/:listId', async (req, res) => {
    try {

        const { listId } = req.params

        await CardModel.deleteMany({ listId })

        await ListModel.findByIdAndDelete(listId)

        res.json({ message: "List deleted successfully" })

    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})




