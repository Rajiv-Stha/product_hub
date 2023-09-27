const handleLogin = async (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const emailPayload = {
    email,
    password,
  };
  try {
    const res = await axios.post(
      "http://localhost:8000/api/login",
      emailPayload
    );
    console.log(res);
  } catch (error) {
    console.log(error.message);
  }
};

document.querySelector("#loginForm").addEventListener("submit", handleLogin);
