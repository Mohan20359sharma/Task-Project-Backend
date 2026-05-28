const express=require("express")
const cookieParser=require("cookie-parser")
const authRoutes=require("./routes/auth.routes")
const taskRoutes=require("./routes/task.routes")
const userRoutes=require("./routes/user.routes")
const cors=require("cors")

const app=express();
app.use(cors());

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/create",taskRoutes)
app.use("/api/users",userRoutes)
module.exports=app;