import orderService from "../services/orderService.js";

const createOrder = async (req, res) => {
  const input = req.body;

  try {
    if (!input.orderItems || !input.orderItems.length) {
      return res.status(400).send("Order items are required");
    }

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
  try {
    const data = await orderService.getOrderById(req.params.id);

    res.status(200).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getOrdersbyUser = async (req, res) => {
  try {
    const data = await orderService.getOrdersbyUser(req.query, req.user._id);

    res.status(200).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const updateOrder = async (req, res) => {
  try {
    const data = await orderService.updateOrder(
      req.params.id,
      req.body,
      req.user
    );

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const deleteOrder = async (req, res) => {
  try {
    await orderService.deleteOrder(req.params.id, req.user);

    res.status(200).send("Order deleted successfully");
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const orderPaymentViaKhalti = async (req, res) => {
  try {
    const data = await orderService.orderPaymentViaKhalti(
      req.params.id,
      req.user
    );

    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const confirmOrderPayment = async (req, res) => {
  try {
    const data = await orderService.confirmOrderPayment(
      req.params.id,
      req.body.status,
      req.user
    );

    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getOrdersOfMerchant = async (req, res) => {
  try {
    const data = await orderService.getOrdersOfMerchant(req.user._id);

    res.status(200).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

export default {
  confirmOrderPayment,
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  getOrdersbyUser,
  getOrdersOfMerchant,
  orderPaymentViaKhalti,
  updateOrder,
};
