import orderService from "../services/orderService.js";

const createOrder = async (req, res) => {
    const input = req.body;

    if (!input.orderItems || !input.orderItems.length) {
        return res.status(400).send("Order items are required");
    }
    try {
        const data = await orderService.createOrder(req.body, req.user);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getOrders = async (req, res) => {
    try {
        const data = await orderService.getOrders();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteOrder = async (req, res) => {
    const id = req.params.id;
    try {
        await orderService.deleteOrder(id)
        res.status(200).send("Order deleted successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export default { createOrder, getOrders, deleteOrder };