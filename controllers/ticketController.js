
const Ticket = require("../models/Ticket");
const { joinQueueService, getQueuePosition } = require("../services/ticketService");

// JOIN QUEUE (user)
const joinQueue = async (req, res) => {
  try {
    const { queueId } = req.body;
    const ticket = await joinQueueService(req.user._id, queueId);

    res.status(201).json({
      message: "Joined queue successfully",
      ticket
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET QUEUE POSITION (user)
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

// CANCEL TICKET (user)
const cancelTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      { status: "cancelled" },
      { new: true }
    );

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    res.status(200).json({
      message: "Ticket cancelled successfully",
      ticket
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Admin / User APIs 

// GET ALL TICKETS IN A QUEUE (Admin)
const getTicketsByQueue = async (req, res) => {
  try {
    const { queueId } = req.params;
    const tickets = await Ticket.find({ queue: queueId }).populate("user", "name email");
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TICKET STATUS (Admin)
const updateTicketStatus = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      { status },
      { new: true }
    );

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    res.status(200).json({
      message: "Ticket status updated successfully",
      ticket
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL TICKETS OF LOGGED-IN USER
const getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).populate("queue", "name location");
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  joinQueue,
  getPosition,
  cancelTicket,
  getTicketsByQueue,
  updateTicketStatus,
  getUserTickets
};