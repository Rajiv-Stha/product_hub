let uploadPayload = {
  name: "",
  desc: "",
  owner: "",
};

document.querySelector(".selectImage").addEventListener("click", () => {
  document.querySelector(".uploadInput").click();
});

document.querySelector("#uploadForm").addEventListener("submit", (e) => {
  e.preventDefault();

  //   uploadPayload.name = document.value
  // uploadPayload.desc= document.qsl

  let user = getLoginUser();
  if (!user) return;
  uploadPayload.owner = user._id;

  //   axios.post("")
});

const getLoginUser = () => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  return user ?? null;
};
