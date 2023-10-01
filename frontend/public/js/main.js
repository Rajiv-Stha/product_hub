let cart = [
  {
    category: "t-shirt",
    createdAt: "2023-09-26T12:08:38.450Z",
    desc: "trip hop 90s music - glory box - music concert t-shirt",
    image:
      "https://res.cloudinary.com/onlinecoder/image/upload/v1695462411/ducqisqfhzjfu3vyfir0.png",
    name: "Portishead t shirt - Dummy",

    price: 1400,
    quantity: 4,
    updatedAt: "2023-09-26T12:08:38.450Z",
    __v: 0,
    _id: "6512c9c6c0ef27ad319b04ef",
  },
];

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
        ).innerHTML += ` <a href="http://127.0.0.1:5500/frontend/public/html/singleProduct.html?productId=${product._id}" class="all_products_card">
        <div class="all_product_card_img_wrapper">
            <img src=${product.image} alt="pant">
        </div>
        <div class="all_product_card_details">

            <p class="all_product_name">${product.name}</p>
         
            <h3 class="all_product_price">Rs. ${product.price}</h3>
        </div>
      
    </a>`;
      });
    }
  } catch (error) {
    console.log(error);
  }
};

fetchCategoryItems();
fetchAllProducts();
