const express = require("express");
const routeNotFoundMiddleware = require('./middlewares/routeNotFound');
const postRouter = require("./routers/postRouter")
const tagRouter = require("./routers/tagRouter")
const messageRouter = require("./routers/messageRouter")
// const authRouter = require("./routers/authRouter")
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5174" , "http://localhost:5173"]}
))
app.use("/posts", postRouter)
app.use("/tags", tagRouter)
app.use("/messages" , messageRouter)
// app.use("", authRouter)
app.use(routeNotFoundMiddleware)
app.listen(process.env.PORT || 3000 , () =>{
    console.log(`http://localhost:${process.env.PORT}`)
});