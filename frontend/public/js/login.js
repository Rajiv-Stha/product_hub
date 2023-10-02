const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentails: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

const handleLogin = async (e) => {
  e.preventDefault();

  const email = document.querySelector("#login_email");

  const password = document.querySelector("#login_password");

  const emailPayload = {
    email: email.value,
    password: password.value,
  };
  try {
    const { status, data } = await axiosInstance.post(
      "/auth/login",
      emailPayload
    );
    email.value = "";
    password.value = "";
    if (status === 200) {
      localStorage.setItem("user", JSON.stringify(data.message));
      window.location.href = "http://127.0.0.1:5500/frontend/index.html";
    }
  } catch (error) {
    console.log(error.message);
  }
};

document.querySelector("#loginForm").addEventListener("submit", handleLogin);
