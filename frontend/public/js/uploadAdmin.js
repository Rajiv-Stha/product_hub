let uploadPayload = {
  name: "",
  desc: "",
  owner: "",
  price: "",
  image:[],
  quantity: "",
  category: "",
};


const cloudName = "codewithmama"; // replace with your own cloud name
const uploadPreset = "wrapfileImg"; // replace with your own upload preset






document.querySelector("#uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  // alert("helo");

  let user = getLoginUserFromLs();
  if (!user) return;
  //   uploadPayload.name = document.value
  // uploadPayload.desc= document.qsl
  uploadPayload.name = document.querySelector("#name").value;
  uploadPayload.desc = document.querySelector("#desc").value;
  uploadPayload.price = document.querySelector("#price").value;
  uploadPayload.quantity = document.querySelector("#quantity").value;
  uploadPayload.category = document.querySelector("#cateogory").value;
  uploadPayload.owner = user._id;

  try {
    const { data, status } = await axios.post(
      "http://localhost:8000/api/product/create",
      uploadPayload
    );
    console.log(data, "img");
    if (status === 200) {
      document.querySelector("#name").value = "";
      document.querySelector("#desc").value = "";
      document.querySelector("#price").value = "";
      document.querySelector("#quantity").value = "";
      document.querySelector("#cateogory").value = "";
      showToast("success", "uploaded successfully");
    }
  } catch (error) {
    console.log(error);
  }
});

const getLoginUserFromLs = () => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  return user ?? null;
};

const fetchCategory = async () => {
  const { data, status } = await axios.get(
    "http://localhost:8000/api/category"
  );
  if (status === 200) {
    data.message.forEach((option) => {
      document.querySelector("#cateogory").innerHTML += `
      <option value=${option.categoryName}>${option.categoryName}</option>`;
    });
  }
  console.log(data.message);
};

const previewImages=()=>{
uploadPayload.image.forEach(img=>{
  document.querySelector(".productImagePreview").innerHTML+=`
    <img src=${img} alt="productImg"/>
  `
})
}

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
    multiple: true,  //restrict upload to a single file
    sources: [ "local"],
   
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      uploadPayload.image.push(result.info.secure_url);
       document.querySelector(".productImagePreview").innerHTML+=`
    <img src=${result.info.secure_url} alt="productImg"/>
  `
    }
  }
);

document.querySelector(".selectImage").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);


fetchCategory();
