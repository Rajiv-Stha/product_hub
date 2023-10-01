const orderModel = require("../models/orderModel");

const createOrder = async (req, res, next) => {
  try {
    const newOrder = await orderModel.create(req.body);
    return res.status(200).json({ message: newOrder, success: true });
  } catch (error) {
    next(error);
  }
};
const getOrder = async (req, res, next) => {
  try {
    const allOrder = await orderModel.find({ ...req.query });
    return res.status(200).json({ message: allOrder, success: true });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  const orderId = req.params.id;
  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(
      {
        _id: orderId,
      },
      {
        $set: req.body,
      },
      {
        returnDocument: true,
        new: true,
      }
    );
    return res.status(200).json({ message: updatedOrder, success: true });
  } catch (error) {
    next(error);
  }
};
const deleteOrder = async (req, res, next) => {
  const orderId = req.params.id;

  try {
    await orderModel.deleteOne({ _id: orderId });
    return res
      .status(200)
      .json({ message: "deleted successfully", success: true });
  } catch (error) {
    next(error);
  }
};
module.exports = { createOrder, getOrder, updateOrder, deleteOrder };
