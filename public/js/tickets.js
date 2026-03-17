
const token = localStorage.getItem("token");
const API_URL = "http://localhost:4000/api";

document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "dashboard.html";
});


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

    div.innerHTML = `<h3>${t.queue.name}</h3>
                     <p>Token: ${t.tokenNumber} | Status: ${t.status}</p>`;
    div.appendChild(cancelBtn);
    div.appendChild(document.createElement("hr"));
    container.appendChild(div);
  });
}


async function cancelTicket(ticketId) {
  const res = await fetch(`${API_URL}/tickets/cancel/${ticketId}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  alert(data.message);
  fetchTickets();
}


fetchTickets();