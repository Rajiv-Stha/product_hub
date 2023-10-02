const fetchAdminProducts = async () => {
  try {
    const { status, data } = await axios.get(
      "http://localhost:8000/api/product"
    );
    console.log(data.message, "hi");
    if (status === 200) {
      data.message.forEach((product) => {
        document.querySelector(
          ".admin_product_card_container"
        ).innerHTML += `<div class="admin_product_card">
            <div class="admin_product_card_img_wrapper">
                <img src=${product.image} alt="productImg">
            </div>
            <div class="admin_product_card_detail">

                <p class="admin_product_product_name">${product.name} </p>
                <h3 class="admin_product_product_price">Rs. ${product.price}</h3>
            </div>
            <div class="admin_product_card_button_wrapper">
                <button>
                    <img width="16" height="16" src="https://img.icons8.com/metro/26/edit.png" alt="edit"/>
                    <p>Edit</p>
                </button>
                <button onclick="handleAdminCartDelete('${product._id}')">
                    <img src="../icons/red_delete.svg" alt="delete" class="admin_product_card_del_icon">
                    <p class="admin_product_del_txt">Delete</p>
                </button>
            </div>
        </div>`;
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const handleAdminCartDelete = async (id) => {
  toastr.info("Are you the 6 fingered man?");
  //   try {
  //     const { data, status } = await axios.delete(
  //       `http://localhost:8000/api/product/${id}`
  //     );
  //     if (status === 200) {
  //       alert("hello");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
};
fetchAdminProducts();
