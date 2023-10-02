const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");
let addBtn = document.querySelector(".single_product_add_btn");
let minusBtn = document.querySelector(".single_product_minus_btn");
let quantityValue = document.querySelector(".single_product_quantity");
let addToCartBtn = document.querySelector(".single_product_cart_btn");
const buyBtn = document.querySelector(".single_product_buy_btn");

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
  setLs({ ...productData, buyQuantity: quantity });
});
let getLs = () => {
  let cartData = localStorage.getItem("cart");
  if (cartData) {
    cartData = JSON.parse(cartData);
  }
  return cartData || [];
};
let setLs = (cart) => {
  const prev = getLs();

  const prevCart = prev.find((c) => c._id === cart._id);

  if (prevCart) {
    const updatedCart = prev.map((c) => {
      if (c._id === cart._id) {
        console.log(c.buyQuantity + quantity);
        return { ...cart, buyQuantity: c.buyQuantity + quantity };
      } else {
        return c;
      }
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  } else {
    let allCartData = [...prev, cart];
    localStorage.setItem("cart", JSON.stringify(allCartData));
  }
};

buyBtn.addEventListener("click", async () => {
  let newOrder = {
    buyer: "6512c870c0ef27ad319b04ea",
    quantity: quantity,
    product: productId,
    totalPrice: quantity * productData.price,
  };
  try {
    const { data, status } = await axios.post(
      "http://localhost:8000/api/order/create",
      newOrder
    );
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
});
