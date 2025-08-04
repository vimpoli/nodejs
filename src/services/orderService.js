import Order from "../models/Order.js";

const createOrder = async (data, userId) => {
    const ordernumber = crypto.randomUUID();
    return await Order.create({ ...data, user: userId, ordernumber });
};

const getOrders = async () => {
    const orders = await Order.find().populate("orderItems.product").populate("user", ["name", "email", "address", "phone"]);
    return orders;
}

const deleteOrder = async (id) => await Order.findByIdAndDelete(id);

export default { getOrders, createOrder, deleteOrder };