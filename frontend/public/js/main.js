let avatar = document.querySelector(".avatar_img");

document.querySelector(".navbar_search_btn").addEventListener("click",()=>{
 let searchQuery =   document.querySelector("#navSearchInput").value;
  location.href = `http://127.0.0.1:5500/frontend/public/html/categoryCard.html?searchName=${searchQuery}`
})


const checkIfToShowLoginToast = () => {
  const isTrue = localStorage.getItem("first");
  if (isTrue) {
    showToast("success", "successfully logged in");
    localStorage.removeItem("first");
  }
};

checkIfToShowLoginToast();

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

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
        ).innerHTML += ` <li><a href="http://127.0.0.1:5500/frontend/public/html/categoryCard.html?categoryName=${cat.categoryName}">${cat.categoryName}</a></li>`;
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
const fetchBestCategoryProducts = async () => {
  try {
    const { status, data } = await axios.get(
      "http://localhost:8000/api/product"
    );
    // console.log("hello", data.message);
    if (status === 200) {
      data.message.forEach((product) => {
        document.querySelector(
          ".best_category_products_card_container"
        ).innerHTML += ` <div class="best_category_products_card">
        <div class="best_category_product_card_img_wrapper">
            <img src=${product.image} alt="pant">
        </div>
        <div class="best_category_product_card_details">

            <p class="best_category_product_name">${product.name}</p>
         
            <h3 class="best_category_product_price">Rs. ${product.price}</h3>
        </div>
      
    </div>`;
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const fetchSessinUser = async () => {
  try {
    axiosInstance.get("/user/sessionUser");
  } catch (error) {}
};
const getLoginUser = () => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  return user ?? null;
};

const handleLogout = () => {
  localStorage.setItem("user", null);
  showToast("success", "Logged out successfully");
  setTimeout(() => {
    location.reload();
  }, 2000);
};
const addUserDataInNavbar = () => {
  const user = getLoginUser();
  console.log(user);
  if (user) {
    document.querySelector(".logoutButton").style.display = "flex";
    document.querySelector(".navCartButton").style.display = "block";
    document.querySelector(".profile_wrapper").style.display = "flex";
    document.querySelector(".username").innerText = user.username;
    document.querySelector(".useremail").innerText = user.email;
    avatar.src = user.image;

    document
      .querySelector(".logoutButton")
      .addEventListener("click", handleLogout);
    const currentUrl = location.href;
  } else {
    document.querySelector(".navCartButton").style.display = "none";
    document.querySelector(".profile_wrapper").style.display = "none";
    document.querySelector(".navbar_button_wrapper").style.display = "flex";
    document.querySelector(".logoutButton").style.display = "none";
  }
};

addUserDataInNavbar();
fetchCategoryItems();
fetchAllProducts();
fetchBestCategoryProducts();
fetchSessinUser();


