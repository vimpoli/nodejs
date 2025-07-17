import express from "express";
import bodyParser from "body-parser";

import config from "./config/config.js";
import productRoutes from "./routes/productRoutes.js";

// Initialize express
const app = express();
// parse application/json 
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(201).json({
        name: config.name,
        port: config.port,
        version: config.version,
    });
});

app.use("/products", productRoutes);

app.listen(config.port, () => {
    console.log(`Server running at port ${config.port}...`);
});