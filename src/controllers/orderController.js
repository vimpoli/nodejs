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
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getOrders = async (req, res) => {
  try {
    const data = await orderService.getOrders();
    res.status(200).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getOrderById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await orderService.getOrderById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getOrdersbyUser = async (req, res) => {
  try {
    const data = await orderService.getOrdersbyUser(req.user._id);
    res.status(200).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const updateOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await orderService.updateOrder(id, req.body);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const deleteOrder = async (req, res) => {
  const id = req.params.id;
  try {
    await orderService.deleteOrder(id);
    res.status(200).send("Order deleted successfully");
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const orderPayment = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await orderService.orderPayment(id);

    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const confirmOrderPayment = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await orderService.confirmOrderPayment(id, req.body.status);

    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

export default {
  createOrder,
  getOrders,
  getOrdersbyUser,
  getOrderById,
  updateOrder,
  deleteOrder,
  orderPayment,
  confirmOrderPayment,
};
