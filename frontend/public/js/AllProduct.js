const urlParams = new URLSearchParams(window.location.search);
const categoryName= urlParams.get("categoryName");
const searchName = urlParams.get("searchName")
const allCatTabElm = document.querySelector("#allCategoyTab");



const displayActiveCatTab=()=>{
  console.log(document.querySelectorAll(".productCategoryTab"))
document.querySelectorAll(".productCategoryTab").forEach(elm=>{
  let name = elm.innerText;
  if(name===categoryName){
    elm.classList.add("category_card_li_active")
  }
})

}


const initializeAllProduct=()=>{
    
    if(categoryName==="All"){
        fetchAllProductsInProductAllPage()
    }else if(categoryName){
        fetchDataByCategoryName()
    }else if(searchName){
      searchProduct()
    }

}

const fetchAllProductsInProductAllPage=async()=>{
       try {


      const {data,status}  = await  axiosInstance.get(`/product`);

        if(status===200){
            
            data.message.forEach(p=>{

                document.querySelector(".category_card_content").innerHTML += `
                
                            <div class="category_card_content_box">
                    <div class="category_card_content_image_wrapper">
                        <img src=${p.image} alt="pant">
                    </div>
                    <div class="category_card_content_box_details">
            
                        <p class="category_card_content_name">${p.name}</p>
                     
                        <h3 class="category_card_content_price">Rs.${p.price}</h3>
                    </div>
                  
                </div>
                `
            })
        }
        
    } catch (error) {
        
    }
}

const fetchDataByCategoryName=async()=>{
    try {


      const {data,status}  = await  axiosInstance.get(`/product?category=${categoryName}`);

        if(status===200){
            
            data.message.forEach(p=>{

                document.querySelector(".category_card_content").innerHTML += `
                
                            <div class="category_card_content_box">
                    <div class="category_card_content_image_wrapper">
                        <img src=${p.image} alt="pant">
                    </div>
                    <div class="category_card_content_box_details">
            
                        <p class="category_card_content_name">${p.name}</p>
                     
                        <h3 class="category_card_content_price">Rs.${p.price}</h3>
                    </div>
                  
                </div>
                `
            })
        }
        
    } catch (error) {
        
    }
}


const fetchCategoryItemsInAllProducts = async () => {
  try {
    const { status, data } = await axios.get(
      "http://localhost:8000/api/category"
    );

    if (status === 200) {
      data.message.forEach((cat) => {
        document.querySelector(
          ".category_card_lists"
        ).innerHTML += ` <li class="productCategoryTab"><a href="http://127.0.0.1:5500/frontend/public/html/categoryCard.html?categoryName=${cat.categoryName}">${cat.categoryName}</a></li>`;
      });
      displayActiveCatTab()
    }
  } catch (error) {
    console.log(error.message);
  }
};

const searchProduct=async()=>{
  try {
    
    const {data,status } = await  axiosInstance.get(`/product/search?search_query=${searchName}`)
     if(status===200){
            
            data.message.forEach(p=>{

                document.querySelector(".category_card_content").innerHTML += `
                
                            <div class="category_card_content_box">
                    <div class="category_card_content_image_wrapper">
                        <img src=${p.image} alt="pant">
                    </div>
                    <div class="category_card_content_box_details">
            
                        <p class="category_card_content_name">${p.name}</p>
                     
                        <h3 class="category_card_content_price">Rs.${p.price}</h3>
                    </div>
                  
                </div>
                `
            })
        }

  } catch (error) {
    
  }
}








initializeAllProduct()
fetchCategoryItemsInAllProducts()
