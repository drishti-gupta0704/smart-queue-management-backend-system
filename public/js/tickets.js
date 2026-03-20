
// public/js/tickets.js

const API_URL = "http://localhost:4000/api";
const token = localStorage.getItem("token");
const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

// Redirect if not logged in
if (!token || !user) {
  alert("Please login first");
  window.location.href = "index.html";
}

// Back to dashboard
document.getElementById("backBtn")?.addEventListener("click", () => {
  window.location.href = "dashboard.html";
});

// Fetch user tickets
async function fetchTickets() {
  const res = await fetch(`${API_URL}/tickets/my-tickets`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const container = document.getElementById("tickets");
  container.innerHTML = "";

  data.tickets.forEach(t => {
    const div = document.createElement("div");
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel Ticket";
    cancelBtn.addEventListener("click", () => cancelTicket(t._id));

    const queueName = t.queue?.name || "Unknown Queue";
    const tokenNumber = t.tokenNumber || "-";
    const status = t.status || "waiting";

    div.innerHTML = `<h3>${queueName}</h3>
                     <p>Token: ${tokenNumber} | Status: ${status}</p>`;
    div.appendChild(cancelBtn);
    div.appendChild(document.createElement("hr"));
    container.appendChild(div);
  });
}

// Cancel ticket
async function cancelTicket(ticketId) {
  const res = await fetch(`${API_URL}/tickets/cancel/${ticketId}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  alert(data.message);
  fetchTickets();
}

// Initial fetch
fetchTickets();