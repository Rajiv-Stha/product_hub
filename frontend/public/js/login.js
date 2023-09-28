const handleLogin = async (e) => {
  e.preventDefault();

  const email = document.querySelector("#login_email");

  const password = document.querySelector("#login_password");

  const emailPayload = {
    email: email.value,
    password: password.value,
  };
  try {
    const { status, data } = await axios.post(
      "http://localhost:8000/api/auth/login",
      emailPayload
    );
    console.log(data);

    email.value = "";
    password.value = "";
    if (status === 200) {
      window.location.href = "http://127.0.0.1:5500/frontend/index.html";
    }
  } catch (error) {
    console.log(error.message);
  }
};

document.querySelector("#loginForm").addEventListener("submit", handleLogin);
