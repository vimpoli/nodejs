import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";

import config from "./config/config.js";
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import connectDB from "./config/db.js";
import logger from "./middlewares/logger.js";
import auth from "./middlewares/auth.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

connectDB();
connectCloudinary();

app.use(cors({
  origin: "https://frontend-phi-six-59.vercel.app",
  credentials: true
}));
app.use(bodyParser.json());
app.use(logger);

app.get("/", (req, res) => {
  res.status(201).json({
    name: config.name,
    port: config.port,
    version: config.version,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", upload.array("images", 5), productRoutes);
app.use("/api/users", auth, upload.single("image"), userRoutes);
app.use("/api/orders", auth, orderRoutes);

app.listen(config.port, () => {
  console.log(`Server running at port ${config.port}...`);
});
