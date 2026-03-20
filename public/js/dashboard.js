
// public/js/dashboard.js

const API_URL = "http://localhost:4000/api";
const token = localStorage.getItem("token");
const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

// Redirect if not logged in
if (!token || !user) {
  alert("Please login first");
  window.location.href = "index.html";
}

// Real-time setup
const socket = io("http://localhost:4000");

// Display welcome message if you have element
document.addEventListener("DOMContentLoaded", () => {
  const welcomeEl = document.getElementById("welcomeMsg");
  if (welcomeEl) welcomeEl.textContent = `Welcome, ${user.name}`;
});

// Go to My Tickets page
document.getElementById("myTicketsBtn")?.addEventListener("click", () => {
  window.location.href = "mytickets.html";
});

// Fetch and display all queues
async function fetchQueues() {
  const res = await fetch(`${API_URL}/queues`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const queues = await res.json();
  const container = document.getElementById("queues");
  container.innerHTML = "";

  queues.forEach(q => {
    const div = document.createElement("div");
    const joinBtn = document.createElement("button");
    joinBtn.textContent = "Join Queue";
    joinBtn.addEventListener("click", () => joinQueue(q._id));

    div.innerHTML = `<h3>${q.name} (${q.location})</h3>
                     <p>Max Size: ${q.maxSize} | Current Token: ${q.currentToken}</p>`;
    div.appendChild(joinBtn);
    div.appendChild(document.createElement("hr"));
    container.appendChild(div);
  });
}

// Join a queue
async function joinQueue(queueId) {
  const res = await fetch(`${API_URL}/tickets/join`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ queueId })
  });

  const data = await res.json();
  alert(data.message);
  fetchQueues();
}

// Initial fetch
fetchQueues();

// Real-time updates
socket.on("ticketJoined", () => fetchQueues());
socket.on("ticketCancelled", () => fetchQueues());