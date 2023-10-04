const fetchCountry = async () => {
  try {
    const { data, status } = await axios.get(
      "https://restcountries.com/v3.1/all"
    );
    console.log(data);
    data.forEach((country) => {
      document.querySelector(
        "#signup_select"
      ).innerHTML += ` <option value="${country.name.common}">${country.name.common}</option>`;
    });
  } catch (error) {
    console.log(error);
  }
};
fetchCountry();
