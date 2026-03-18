
const token = localStorage.getItem("token");
const API_URL = "http://localhost:4000/api";
const socket = io("http://localhost:4000");

document.getElementById("myTicketsBtn").addEventListener("click", () => {
  window.location.href = "mytickets.html";
});


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

fetchQueues();

// Real-time updates
socket.on("ticketJoined", data => fetchQueues());
socket.on("ticketCancelled", data => fetchQueues());