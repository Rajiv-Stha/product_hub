const {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/productController");

const router = require("express").Router();

router.post("/create", createProduct);
router.get("/", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
