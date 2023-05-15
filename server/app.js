import express from "express"
import mongoose from "mongoose"
import authRoutes from "./routes/authRoutes.js"
import dotenv from "dotenv"
import cors from "cors"

const app = express()
dotenv.config()
app.listen(5000, () => {
    console.log(" listening to requests on port 5000")

})
app.use(cors(
    {
        origin: "*"
    }
))
const url = process.env.url
app.use(express.json({ limit: ".5mb" }))
mongoose.set("strictQuery", false);
mongoose.connect(url).then(() =>
    console.log("connected to mongoDB !")
).catch((err) => {
    console.error(err)
})
app.use("/auth", authRoutes)
