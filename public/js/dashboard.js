
const token = localStorage.getItem("token");
const API_URL = "http://localhost:4000/api";
const socket = io("http://localhost:4000");

document.getElementById("myTicketsBtn").addEventListener("click", () => {
  window.location.href = "mytickets.html";
});
