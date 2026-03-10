
const Ticket = require("../models/Ticket");
const { joinQueueService } = require("../services/queueService");
const { getQueuePosition } = require("../services/ticketService");

// JOIN QUEUE
const joinQueue = async (req, res) => {

  try {

    const { queueId } = req.body;

    const ticket = await joinQueueService(req.user._id, queueId);

    res.status(201).json({
      message: "Joined queue successfully",
      ticket
    });

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

};


// GET QUEUE POSITION
const getPosition = async (req, res) => {

  try {

    const { queueId } = req.params;

    const data = await getQueuePosition(queueId, req.user._id);

    if (!data) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    res.status(200).json(data);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

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

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    res.status(200).json({
      message: "Ticket cancelled successfully",
      ticket
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  joinQueue,
  getPosition,
  cancelTicket
};