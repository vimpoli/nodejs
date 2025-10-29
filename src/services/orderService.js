import {
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_PENDING,
} from "../constants/orderStatuses.js";
import {
  PAYMENT_STATUS_COMPLETED,
  PAYMENT_STATUS_FAILED,
} from "../constants/paymentStatuses.js";
import { ADMIN } from "../constants/roles.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import payment from "../utils/payment.js";

const createOrder = async (data, userId) => {
  const orderNumber = crypto.randomUUID();

  return await Order.create({ ...data, user: userId, orderNumber });
};

const getOrders = async () => {
  const orders = await Order.find()
    .populate("orderItems.product")
    .populate("user", ["name", "email", "address", "phone"]);

  return orders;
};

const getOrderById = async (id) => {
  const order = await Order.findById(id)
    .sort({ createdAt: -1 })
    .populate("orderItems.product")
    .populate("user", ["name", "email", "address", "phone"])
    .populate("payment");

  if (!order) {
    throw {
      statusCode: 404,
      message: "Order not found",
    };
  }

  return order;
};

const getOrdersbyUser = async (query, userId) => {
  const orders = await Order.find({
    status: query?.status || ORDER_STATUS_PENDING,
    user: userId,
  })
    .populate("orderItems.product")
    .populate("user", ["name", "email", "address", "phone"])
    .populate("payment");

  return orders;
};

const updateOrder = async (id, data, authUser) => {
  const order = await getOrderById(id);

  try {
    if (order.user != authUser._id && !authUser.roles.includes(ADMIN)) {
      throw {
        statusCode: 403,
        message: "Access denied",
      };
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: data.status },
      { new: true }
    );

    return updatedOrder;
  } catch (error) {
    return error;
  }
};

const deleteOrder = async (id, authUser) => {
  const order = await getOrderById(id);

  if (order.user != authUser._id && !authUser.roles.includes(ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access denied",
    };
  }

  return await Order.findByIdAndDelete(id);
};

const orderPaymentViaKhalti = async (id, authUser) => {
  const order = await getOrderById(id);

  if (order.user._id != authUser._id) {
    throw {
      statusCode: 403,
      message: "Access denied",
    };
  }

  const transactionId = crypto.randomUUID();

  const orderPayment = await Payment.create({
    amount: order.totalPrice,
    method: "online",
    transactionId,
  });

  await Order.findByIdAndUpdate(id, {
    payment: orderPayment._id,
  });

  return await payment.payViaKhalti({
    amount: order.totalPrice,
    purchaseOrderId: order.id,
    purchaseOrderName: order.ordernumber,
    customer: order.user,
  });
};

const confirmOrderPayment = async (id, status, user) => {
  const order = await getOrderById(id);

  if (order.user != user._id && !user.roles.includes(ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access denied",
    };
  }

  if (status.toUpperCase() !== PAYMENT_STATUS_COMPLETED) {
    await Payment.findByIdAndUpdate(order.payment._id, {
      status: PAYMENT_STATUS_FAILED,
    });

    throw {
      statusCode: 400,
      message: "Payment confirmation failed",
    };
  }

  await Payment.findByIdAndUpdate(order.payment._id, {
    status: PAYMENT_STATUS_COMPLETED,
  });

  return await Order.findByIdAndUpdate(
    id,
    {
      status: ORDER_STATUS_CONFIRMED,
    },
    { new: true }
  );
};

const getOrdersOfMerchant = async (merchantId) => {
  const orders = await Order.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "orderItems.product",
        foreignField: "_id",
        as: "orderItems",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        "user.name": 1,
        "user.email": 1,
        "user.address": 1,
        "user.phone": 1,
        ordernumber: 1,
        totalPrice: 1,
        status: 1,
        orderItems: 1,
        shippingAddress: 1,
        createdAt: 1,
      },
    },
  ]);

  return orders
    .map((order) => {
      const filteredItems = order.orderItems.filter(
        (item) => item && item.createdBy && item.createdBy == merchantId
      );
      return {
        ...order,
        orderItems: filteredItems,
      };
    })
    .filter((order) => order.orderItems.length > 0);
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
