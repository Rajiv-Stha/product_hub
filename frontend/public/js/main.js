const fetchCategoryItems = async () => {
  try {
    const { status, data } = await axios.get(
      "http://localhost:8000/api/category"
    );
    console.log(data);
    if (status === 200) {
      data.message.forEach((cat) => {
        document.querySelector(
          ".category_list"
        ).innerHTML += ` <li><a href="#">${cat.categoryName}</a></li>`;
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
fetchCategoryItems();

const fetchAllProducts = async () => {
  try {
    const { status, data } = await axios.get(
      "http://localhost:8000/api/product"
    );
    console.log(data.message);
    if (status === 200) {
      data.message.forEach((product) => {
        document.querySelector(
          ".allProducts_card_container"
        ).innerHTML += ` <div class="all_products_card">
        <div class="all_product_card_img_wrapper">
            <img src=${product.image} alt="pant">
        </div>
        <div class="all_product_card_details">

            <p class="all_product_name">${product.name}</p>
         
            <h3 class="all_product_price">Rs. ${product.price}</h3>
        </div>
      
    </div>`;
      });
    }
  } catch (error) {
    console.log(error);
  }
};
fetchAllProducts();
