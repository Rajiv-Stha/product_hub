const cartContainer = document.querySelector(".cart_items");

let getLs = () => {
  let cartData = localStorage.getItem("cart");
  if (cartData) {
    cartData = JSON.parse(cartData);
  }
  return cartData || [];
};

const displayCart = () => {
  const cartData = getLs();
  cartData.forEach((cart) => {
    cartContainer.innerHTML += `<div class="cart_card">
        <div class="cart_desc">
    
     
         <div class="cart_img_wrapper">
             <img src=${cart.image} alt="cart_img">
         </div>
         <div class="cart_details">
             <h3>${cart.name}</h3>
             <p>${cart.desc}</p>
    
         </div>
     </div>
         <div class="cart_others">
             <h3>Rs. ${cart.price}</h3>
             <div class="cart_others_icon">
                 <img width="20" height="20" src="https://img.icons8.com/material-outlined/24/filled-like.png" alt="filled-like"/>
                 <img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/48/filled-trash.png" alt="filled-trash"/>
             </div>
         </div>
     </div>`;
  });
};

displayCart();
