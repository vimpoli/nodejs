import Product from "../models/Product.js";

const getProducts = async (query) => {
    const products = await Product.find();
    return products;
}

const getProductById = (id) => {
    const foundProduct = Product.findById(id);
    return foundProduct;
}

const createProduct = async (data) => {
    const createdProduct = await Product.create(data);
    return createdProduct;
}

const updateProduct = async (id, data) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
    return updatedProduct;
}

const deleteProduct = async (id) => {
    await Product.findByIdAndDelete(id);
}

export default { getProducts, getProductById, createProduct, updateProduct, deleteProduct };