import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    password: String
})
export default mongoose.model("users", userSchema)