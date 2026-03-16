import exp from "express";
import {connect} from "mongoose";
import dotenv from "dotenv";
import {boardRouter} from "./routes/boardRoutes.js";
import {cardRouter} from "./routes/cardRoutes.js";
import {listRouter} from "./routes/listRoutes.js";
import {authRouter} from "./routes/authRoutes.js";
dotenv.config()//to access .env file
const App = exp()// creating server
App.use(exp.json())//bodyparser middleware
App.use('/auth-api',authRouter)
App.use('/board-api',boardRouter)
App.use('/card-api',cardRouter)
App.use('/list-api',listRouter)

//connect to db
const connectDB = async()=>
{   try{
    await connect(process.env.DB_URL)//access from .env file
    console.log("DB Connection succesful")
    //start http server
    App.listen(process.env.PORT,()=>console.log(`Server started at port ${process.env.PORT}`))
}
catch(err)
   {
    console.log("Error in DB Connection",err)
   }
}
connectDB()

