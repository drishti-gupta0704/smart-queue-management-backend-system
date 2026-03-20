
// public/js/admin.js

const API_URL = "http://localhost:4000/api";
const token = localStorage.getItem("token");
const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

// Redirect if not logged in or not admin
if (!token || !user || user.role !== "admin") {
  alert("Access denied. Admins only.");
  window.location.href = "index.html";
}

// Create queue
document.getElementById("createQueueBtn")?.addEventListener("click", createQueue);

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

// Fetch all tickets
async function fetchAllTickets() {
  const queuesRes = await fetch(`${API_URL}/queues`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const queues = await queuesRes.json();
  const container = document.getElementById("tickets");
  container.innerHTML = "";

  for (const q of queues) {
    const ticketsRes = await fetch(`${API_URL}/tickets?queueId=${q._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const ticketsData = await ticketsRes.json();
    ticketsData.tickets.forEach(t => {
      const div = document.createElement("div");
      const select = document.createElement("select");
      select.id = `status-${t._id}`;
      ["waiting","serving","completed","cancelled"].forEach(s => {
        const opt = document.createElement("option");
        opt.value = s;
        opt.textContent = s;
        select.appendChild(opt);
      });
      select.value = t.status;

      const updateBtn = document.createElement("button");
      updateBtn.textContent = "Update";
      updateBtn.addEventListener("click", () => updateTicketStatus(t._id));

      const userName = t.user?.name || "Unknown User";

      div.innerHTML = `<h4>Queue: ${q.name}</h4>
                       <p>User: ${userName} | Token: ${t.tokenNumber} | Status:</p>`;
      div.appendChild(select);
      div.appendChild(updateBtn);
      div.appendChild(document.createElement("hr"));
      container.appendChild(div);
    });
  }
}

// Update ticket status
async function updateTicketStatus(ticketId) {
  const status = document.getElementById(`status-${ticketId}`).value;
  const res = await fetch(`${API_URL}/tickets/${ticketId}`, {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  const data = await res.json();
  alert(data.message);
  fetchAllTickets();
}

// Initial fetch
fetchAllTickets();