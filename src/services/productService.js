import Product from "../models/Product.js";
import uploadFile from "../utils/file.js";
import { ADMIN } from "../constants/roles.js";

const createProduct = async (data, files, createdBy) => {
  const uploadedFiles = await uploadFile(files);

  const createdProduct = await Product.create({
    ...data,
    imageUrls: uploadedFiles.map((item) => item?.url),
    createdBy,
  });
  return createdProduct;
};

const getProducts = async (query) => {
  const { name, limit, offset, brands, category, min, max } = query;

  const sort = JSON.parse(query.sort || "{}");

  const filters = {};

  if (brands) {
    const brandItems = brands.split(",");
    filters.brand = { $in: brandItems };
  }
  if (category) filters.category = category;
  if (min) filters.price = { $gte: min };
  if (max) filters.price = { ...filters.price, $lte: max };
  if (name) filters.name = { $regex: name, $options: "i" };

  const products = await Product.find(filters)
    .sort(sort)
    .limit(limit)
    .skip(offset);
  return products;
};

const getProductById = (id) => {
  const product = Product.findById(id);

  if (!product) {
    throw {
      statusCode: 404,
      message: "Product Not Found",
    };
  }
  return product;
};

const updateProduct = async (id, data, files, user) => {
  const product = await getProductById(id);

  if (product.createdBy != user._id && !user.roles.includes(ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access denied",
    };
  }

  const dataToUpdate = data;

  if (files.length < 0) {
    const uploadedFiles = await uploadFile(files);
    dataToUpdate.imageUrls = uploadedFiles.map((item) => item?.url);
  }
  const updatedProduct = await Product.findByIdAndUpdate(id, dataToUpdate, {
    new: true,
  });

  return updatedProduct;
};

const deleteProduct = async (id, user) => {
  const product = await getProductById(id);

  if (product.createdBy != user._id || !user.roles.includes(ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access denied",
    };
  }

  await Product.findByIdAndDelete(id);
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
