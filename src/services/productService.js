import fs from "fs";

const getProducts = () => {
    const products = fs.readFileSync("./src/data/products.json", "utf8");
    const productsObj = JSON.parse(products)
    const filteredProducts = productsObj.filter(product => product.price > 40000);
    return filteredProducts;
}

export default { getProducts };