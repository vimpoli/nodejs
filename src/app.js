import express from "express";
import bodyParser from "body-parser";

import config from "./config/config.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
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

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

app.listen(config.port, () => {
    console.log(`Server running at port ${config.port}...`);
});