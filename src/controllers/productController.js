import productService from "../services/productService.js";
const getProducts = (req, res) => {
    const products = productService.getProducts();
    res.json(products);
}

const getSingleProduct = (req, res) => {
    res.send("One product");
}

const createProduct = (req, res) => {
    res.send("Create a product");
}

const updateProduct= (req, res) => {
    res.send("Update a product");
}

const deleteProduct= (req, res) => {
    res.send("Delete a product");
}

export default { getProducts, getSingleProduct, createProduct, updateProduct, deleteProduct };