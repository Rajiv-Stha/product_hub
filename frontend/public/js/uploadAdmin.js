let uploadPayload = {
  name: "",
  desc: "",
  owner: "",
  price: "",
  image:
    "https://np-live-21.slatic.net/kf/S0f0c6c006f364fed9911723609f6e9f85.jpg_300x0q75.webp",
  quantity: "",
  category: "",
};

document.querySelector(".selectImage").addEventListener("click", () => {
  document.querySelector(".uploadInput").click();
});

console.log(document.querySelector("#uploadForm"));
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
fetchCategory();
