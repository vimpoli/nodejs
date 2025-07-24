import express from "express";
import bodyParser from "body-parser";

import config from "./config/config.js";
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";
import connectDB from "./config/db.js";

// Initialize express
const app = express();

connectDB();

// parse application/json 
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(201).json({
        name: config.name,
        port: config.port,
        version: config.version,
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.listen(config.port, () => {
    console.log(`Server running at port ${config.port}...`);
});