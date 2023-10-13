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
             <h3 class="cart_item_name">${cart.name}</h3>
             <p class="cart_desc_text">${cart.desc}</p>
    
         </div>
     </div>
         <div class="cart_others">
             <h3 class="cartItemText">Rs. ${cart.price} (${cart.buyQuantity})</h3>
             <div class="cart_others_icon">
               <button class="deleteCartButton" onClick="handleDeleteCart('${cart._id}')">Delete</button>
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

const handleBuy=async(e)=>{
  e.preventDefault()
  const allCartItem = getLs();
  const user = getLoginUser()
  if(allCartItem && user){
    let totalPrice=0;
    const item = allCartItem.map((p)=>{
      totalPrice+=p.price * p.buyQuantity;
      return { buyQuantity: p.buyQuantity  ,  product  : p._id }
    })

    const buyPayload={
      item,
      buyer:user._id,
      totalPrice,
      address:document.querySelector("#shippingAddressInput").value,
      number:document.querySelector("#shippingNumberInput").value,
    }
    console.log(buyPayload)

    // try {
    //     await axiosInstance.post("/order/create",buyPayload)
    //     showToast("success", "Order placed succesfully");
    // } catch (error) {
    //     console.log(error)
    //     showToast("error", "Failed to place order  try again.");
    // }

  }
}
const checkIfDisabled=()=>{
  let allCartItem=getLs()?.length;
  if(!allCartItem){
    document.querySelector(".cart_checkout_btn").setAttribute("disabled","true")
    document.querySelector(".cart_checkout_btn").classList.add("buyButtonDisable")
  }
}
document.querySelector(".order_summary_box").addEventListener("submit",handleBuy)
displayCheckOutPrice();
checkIfDisabled()
