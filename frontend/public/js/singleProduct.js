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
    const { status, data } = await axiosInstance.get(
      `/product?_id=${productId}`
    );

    console.log(data.message[0]);
    productData = data.message[0];
    displayProductData();
  } catch (error) {
    console.log(error);
  }
};

getProductById();
const handleImgChange = (src)=>{
  document.querySelector(".single_product_main_image").src = src;

}

const displayProductData = () => {
  if (!productData) {
    return;
  }
  document.querySelector(".single_product_heading").innerText =
    productData?.name;
  document.querySelector(".single_product_main_image").src = productData.image[0];
  document.querySelector(".single_product_desc").innerText = productData.desc;
  document.querySelector(
    ".single_product_price"
  ).innerText = `Rs.${productData.price}`;
      document.querySelector(".single_product_sub_image_wrapper").innerHTML =""
  productData.image.forEach((i,ind)=>{
    if(ind===0)return;
    document.querySelector(".single_product_sub_image_wrapper").innerHTML +=`
                        <img src=${i} onclick="handleImgChange('${i}')" alt="product_img" class="single_product_sub_image">
  
    `
  })
  

  if (productData.quantity <= 0) {
    addToCartBtn.classList.add("disabled");
    buyBtn.classList.add("disabled");
    buyBtn.setAttribute("disabled", "true");
    addToCartBtn.setAttribute("disabled", "true");
    document.querySelector(".single_product_quantity_box").style.display =
      "none";
  }
  document.querySelector(".single_product_stock").innerText =
    productData.quantity <= 0 ? "Empty" : productData.quantity;
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
  showToast("success", "Added to cart");
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
  const user = getLoginUser();
  if (productData.quantity <= 0) {
    alert("Not in stock");
    return;
  }
  if (!user) return;
  let newOrder = {
    buyer: user._id,
    item: [{buyQuantity:quantity,product:productId}],
    totalPrice: quantity * productData.price,
    quantity:0
  };
  try {
    const { data, status } = await axiosInstance.post(
      "/order/create",
      newOrder
    );
    if (status === 200) {
      showToast("success", "Bought successfully");
      getProductById();
    }
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
});

