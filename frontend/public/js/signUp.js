const handleSignup = async (e) => {
  e.preventDefault();
  console.log("inside form");
  const username = document.querySelector("#signup_username");

  const email = document.querySelector("#signup_email");
  const country = document.querySelector("#signup_select");
  const password = document.querySelector("#signup_password");
  const confirmPassword = document.querySelector("#signup_confirm_password");
  const signupPayload = {
    username: username.value,
    email: email.value,
    country: country.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };

  try {
    if (signupPayload.password !== signupPayload.confirmPassword) {
      // alert("password doesn't match");
      return;
    }
    const { data, status } = await axios.post(
      "http://localhost:8000/api/auth/register",
      signupPayload
    );
    console.log(data);

    username.value = "";
    email.value = "";
    country.value = "";
    password.value = "";
    confirmPassword.value = "";
    if (status === 200) {
      window.location.href =
        "http://127.0.0.1:5500/frontend/public/html/login.html";
    }
  } catch (error) {
    console.log(error.message);
  }
};

document.querySelector("#signupForm").addEventListener("submit", handleSignup);
console.log(document.querySelector("#signupForm"));
