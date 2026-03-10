
const Ticket = require("../models/Ticket");
const Queue = require("../models/Queue");
const { generateToken } = require("../services/queueService");
const { getQueuePosition } = require("../services/ticketService");

// JOIN QUEUE
const joinQueue = async (req, res) => {

  try {

    const { queueId, priority } = req.body;

    const queue = await Queue.findById(queueId);

    if (!queue) {
      return res.status(404).json({ message: "Queue not found" });
    }

    const tokenNumber = await generateToken(queueId);

    const ticket = await Ticket.create({
      userId: req.user._id,
      queueId,
      tokenNumber,
      priority: priority || 0
    });

    res.status(201).json(ticket);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// GET QUEUE POSITION
const getPosition = async (req, res) => {

  try {

    const { queueId } = req.params;

    const data = await getQueuePosition(queueId, req.user._id);

    if (!data) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(data);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// CANCEL TICKET
const cancelTicket = async (req, res) => {

  try {

    const { ticketId } = req.params;

    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      { status: "cancelled" },
      { new: true }
    );

    res.json(ticket);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

module.exports = {
  joinQueue,
  getPosition,
  cancelTicket
};