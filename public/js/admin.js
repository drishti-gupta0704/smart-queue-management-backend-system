
const token = localStorage.getItem("token");
const API_URL = "http://localhost:4000/api";

document.getElementById("createQueueBtn").addEventListener("click", createQueue);

async function createQueue() {
  const name = document.getElementById("queueName").value;
  const location = document.getElementById("queueLocation").value;
  const maxSize = document.getElementById("queueMaxSize").value;

  const res = await fetch(`${API_URL}/queues`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, location, maxSize })
  });

  const data = await res.json();
  alert(data.message);
  fetchAllTickets();
}
