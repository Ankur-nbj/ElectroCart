import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from 'url';
dotenv.config();

const DB = process.env.MONGO_URL;
mongoose
  .connect(DB)
  .then(() => {
    console.log("MongoDB connected successful");
  })
  .catch((err) => {
    console.log("MongoDB not  connected");
  });
const __filename= fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname,'./client/build')))
const PORT = process.env.PORT;

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// app.get("/", (req, res) => {
//   res.send("welcome into good world");
// });
app.use('*',function(req,res){
res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

app.listen(PORT, () => {
  console.log(`server is running on : ${PORT} `);
});
