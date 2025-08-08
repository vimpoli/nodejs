import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

import config from "./config/config.js";
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import connectDB from "./config/db.js";
import logger from "./middlewares/logger.js";
import auth from "./middlewares/auth.js";
import roleBasedAuth from "./middlewares/roleBasedAuth.js";
import { ADMIN } from "./constants/roles.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

connectDB();
connectCloudinary();

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
app.use("/api/users", auth, roleBasedAuth(ADMIN), userRoutes);
app.use("/api/orders", orderRoutes);

app.listen(config.port, () => {
  console.log(`Server running at port ${config.port}...`);
});
