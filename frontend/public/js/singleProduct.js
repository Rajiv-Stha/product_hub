const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");
let addBtn = document.querySelector(".single_product_add_btn");
let minusBtn = document.querySelector(".single_product_minus_btn");
let quantityValue = document.querySelector(".single_product_quantity");
let addToCartBtn = document.querySelector(".single_product_cart_btn");

let productData;
let quantity = 1;

const getProductById = async () => {
  try {
    const { status, data } = await axios.get(
      `http://localhost:8000/api/product?_id=${productId}`
    );

    console.log(data.message[0]);
    productData = data.message[0];
    displayProductData();
  } catch (error) {
    console.log(error);
  }
};

getProductById();

const displayProductData = () => {
  if (!productData) {
    return;
  }
  document.querySelector(".single_product_heading").innerText =
    productData?.name;
  document.querySelector(".single_product_main_image").src = productData.image;
  document.querySelector(".single_product_desc").innerText = productData.desc;
  document.querySelector(".single_product_price").innerText = productData.price;
  document.querySelector(".single_product_stock").innerText =
    productData.quantity;
  quantityValue.innerText = quantity;
};

addBtn.addEventListener("click", () => {
  if (quantity >= +productData.quantity) return;

  quantityValue.innerText = ++quantity;
});

minusBtn.addEventListener("click", () => {
  if (quantity <= 1) return;

  quantityValue.innerText = --quantity;
});

addToCartBtn.addEventListener("click", () => {
  cart.push(productData);
  console.log(cart);
});
let getLs = () => {
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    cartData = JSON.parse(cartData);
  }
  return cartData || [];
};
let setLs = (cart) => {
  const prev = getLs();
  let allCartData = [...prev, cart];
  localStorage.setItem("cart", JSON.stringify(allCartData));
};
console.log(cart);
