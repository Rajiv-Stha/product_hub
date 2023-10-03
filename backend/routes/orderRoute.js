const {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");
const { reduceQuantityOfProduct } = require("../controller/productController");

const router = require("express").Router();

router.post("/create", createOrder, reduceQuantityOfProduct);
router.get("/", getOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
module.exports = router;
