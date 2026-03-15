
const API_URL = "http://localhost:4000/api";

// Wait until DOM loads
document.addEventListener("DOMContentLoaded", () => {

  const registerBtn = document.getElementById("registerBtn");
  const loginBtn = document.getElementById("loginBtn");

  if (registerBtn) {
    registerBtn.addEventListener("click", registerUser);
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", loginUser);
  }

});

