import fs from "fs";

const products = fs.readFileSync("./src/data/products.json", "utf8");
const productsObj = JSON.parse(products);

const getProducts = (query) => {
    const filteredProducts = productsObj.filter((product) => product.brand == query.brand);
    return filteredProducts;
}

const getProductById = (id) => {
    const foundProduct = productsObj.find((product => product.id == id));
    return foundProduct;
}

const createProduct = (data) => {
    // create product
    productsObj.push(data);
    fs.writeFileSync("./src/data/products.json",JSON.stringify(productsObj));

}
export default { getProducts, getProductById, createProduct };