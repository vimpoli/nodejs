import Product from "../models/Product.js";

const createProduct = async (data, createdBy) => {
    const createdProduct = await Product.create({
        ...data,
        createdBy,
    });
    return createdProduct;
}

const getProducts = async () => {
    const products = await Product.find();
    return products;
}

const getProductById = (id) => {
    const product = Product.findById(id);

    if (!product) {
        throw {
            statusCode: 404,
            message: "Product Not Found"
        };
    }
    return product;
}

const updateProduct = async (id, data, userId) => {
    const product = await getProductById(id);

    if (product.createdBy != userId) throw { statusCode: 403, message: "Access denied" };

    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

    return updatedProduct;
}

const deleteProduct = async (id, userId) => {
    const product = await getProductById(id);

    if (product.createdBy != userId) throw { statusCode: 403, message: "Access denied" };

    await Product.findByIdAndDelete(id);
}

export default { getProducts, getProductById, createProduct, updateProduct, deleteProduct };