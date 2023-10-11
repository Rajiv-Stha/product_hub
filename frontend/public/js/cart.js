const cartContainer = document.querySelector(".cart_items");
const subTotalPrice = document.querySelector(".sub_total_price");
let cartTotalPrice = document.querySelector(".cartTotalPrice");

// getting data from local storage
let getLs = () => {
  let cartData = localStorage.getItem("cart");
  if (cartData) {
    cartData = JSON.parse(cartData);
  }
  return cartData || [];
};

const displayCart = () => {
  const cartData = getLs();
  cartContainer.innerHTML = "";
  cartData.forEach((cart) => {
    cartContainer.innerHTML += `<div class="cart_card">
        <div class="cart_desc">
    
     
         <div class="cart_img_wrapper">
             <img src=${cart.image[0]} alt="cart_img">
         </div>
         <div class="cart_details">
             <h3>${cart.name}</h3>
             <p>${cart.desc}</p>
    
         </div>
     </div>
         <div class="cart_others">
             <h3>Rs. ${cart.price} (${cart.buyQuantity})</h3>
             <div class="cart_others_icon">
                 <img width="20" height="20" src="https://img.icons8.com/material-outlined/24/filled-like.png" alt="filled-like"/>
                 <img onclick="handleDeleteCart('${cart._id}')" width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/48/filled-trash.png" alt="filled-trash"/>
             </div>
         </div>
     </div>`;
  });
};

displayCart();
// deletes cart from localStorage
const removeCartFromLs = (deletedId) => {
  let allCart = getLs();
  const filteredCart = allCart.filter((cart) => cart._id !== deletedId);
  localStorage.setItem("cart", JSON.stringify(filteredCart));
};
const handleDeleteCart = (id) => {
  // console.log(cart);
  showToast("success", "deleted successfully");
  removeCartFromLs(id);
  displayCart();
  displayCheckOutPrice();
};

const displayCheckOutPrice = () => {
  let allCart = getLs();
  let sum = 0;
  subTotalPrice.innerHTML = "";
  allCart.forEach((cart) => {
    sum += cart.price * cart.buyQuantity;

    subTotalPrice.innerHTML += `

    <div class="subPriceWrapper">
    <p>${cart.price} * ${cart.buyQuantity}  </p><p>Rs. ${
      cart.price * cart.buyQuantity
    } </p>
    </div>
    `;
  });
  cartTotalPrice.innerText = sum;
};

displayCheckOutPrice();
