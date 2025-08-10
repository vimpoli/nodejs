import productService from "../services/productService.js";

const createProduct = async (req, res) => {
  try {
    const data = await productService.createProduct(
      req.body,
      req.files,
      req.user._id
    );
    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts(req.query);
    res.json(products);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getProductById = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await productService.getProductById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const user = req.user;

  try {
    const updatedProduct = await productService.updateProduct(
      id,
      req.body,
      req.files,
      user,
    );
    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const user = req.user;

  try {
    await productService.deleteProduct(id, user);
    
    res.send(`Product deleted successfully with id: ${id}`);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
