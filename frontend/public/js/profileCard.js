const fetchCountry = async () => {
  try {
    const { data, status } = await axios.get(
      "https://restcountries.com/v3.1/all"
    );
    data.forEach((country) => {
      document.querySelector(
        "#signup_select"
      ).innerHTML += ` <option value="${country.name.common}">${country.name.common}</option>`;
    });
    displayUserData()
  } catch (error) {
    console.log(error);
  }
};


const displayUserData=async()=>{
  const user = getLoginUser()
  if(!user)return;
  console.log(user.country)
  document.querySelector("#profileCardUsername").value = user.username
  document.querySelector(".profileCard_select").value = user.country
  document.querySelector(".profileCardImg").src = user.image;
}
fetchCountry();
