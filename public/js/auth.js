
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

// REGISTER USER
async function registerUser() {

  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  try {

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const data = await response.json();

    alert(data.message);

  } catch (error) {
    console.error("Register error:", error);
  }

}


// LOGIN USER
async function loginUser() {

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    console.log("Login response:", data); 
    if (response.ok) {

      localStorage.setItem("token", data.token);

      // ✅ SAFE CHECK
      if (data.user) {
        localStorage.setItem("role", data.user.role);

        alert("Login successful!");

        if (data.user.role === "admin") {
          window.location.href = "admin.html";
        } else {
          window.location.href = "dashboard.html";
        }

      } else {
        alert("User data missing in response");
      }

    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error("Login error:", error);
  }

}