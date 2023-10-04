const {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
} = require("../controller/productController");

const router = require("express").Router();

router.post("/create", createProduct);
router.get("/", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/search",searchProduct)

module.exports = router;
