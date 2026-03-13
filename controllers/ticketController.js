
const {
  joinQueueService,
  getQueuePosition,
  getUserTicketsService,
  getTicketsByQueueService,
  updateTicketStatusService
} = require("../services/ticketService");

// ---------------- User APIs ----------------

// JOIN QUEUE
const joinQueue = async (req, res) => {
  try {
    const { queueId } = req.body;
    const ticket = await joinQueueService(req.user._id, queueId);

    // Emit Socket.IO event
    const io = req.app.get("io");
    io.emit("ticketJoined", { queueId, ticket });

    res.status(201).json({
      message: "Joined queue successfully",
      ticket
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET QUEUE POSITION
const getPosition = async (req, res) => {
  try {
    const { queueId } = req.params;
    const data = await getQueuePosition(queueId, req.user._id);

    if (!data) return res.status(404).json({ message: "Ticket not found" });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CANCEL TICKET
const cancelTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await updateTicketStatusService(ticketId, "cancelled");

    // Emit event
    const io = req.app.get("io");
    io.emit("ticketCancelled", { queueId: ticket.queue, ticket });

    res.status(200).json({
      message: "Ticket cancelled successfully",
      ticket
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET MY TICKETS
const getMyTickets = async (req, res) => {
  try {
    const tickets = await getUserTicketsService(req.user._id);
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- Admin APIs ----------------

// GET ALL TICKETS IN A QUEUE
const getAllTickets = async (req, res) => {
  try {
    const { queueId } = req.query;
    if (!queueId) return res.status(400).json({ message: "Queue ID is required" });

    const tickets = await getTicketsByQueueService(queueId);
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TICKET STATUS
const updateTicketStatus = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status } = req.body;

    const ticket = await updateTicketStatusService(ticketId, status);

    // Emit event
    const io = req.app.get("io");
    io.emit("ticketUpdated", { queueId: ticket.queue, ticket });

    res.status(200).json({
      message: "Ticket status updated successfully",
      ticket
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  joinQueue,
  getPosition,
  cancelTicket,
  getMyTickets,
  getAllTickets,
  updateTicketStatus
};