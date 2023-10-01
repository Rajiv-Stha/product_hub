const {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");

const router = require("express").Router();

router.post("/create", createOrder);
router.get("/", getOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
module.exports = router;
