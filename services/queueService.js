
const Queue = require("../models/Queue");
const Ticket = require("../models/Ticket");

const joinQueueService = async (userId, queueId) => {

  // check queue exists
  const queue = await Queue.findById(queueId);

  if (!queue) {
    throw new Error("Queue not found");
  }

  // check queue size
  const waitingCount = await Ticket.countDocuments({
    queue: queueId,
    status: "waiting"
  });

  if (waitingCount >= queue.maxSize) {
    throw new Error("Queue is full");
  }

  // check if user already in this queue
  const existingTicket = await Ticket.findOne({
    user: userId,
    queue: queueId,
    status: { $in: ["waiting", "serving"] }
  });

  if (existingTicket) {
    throw new Error("User already in this queue");
  }

  // generate token (atomic increment)
  const updatedQueue = await Queue.findByIdAndUpdate(
    queueId,
    { $inc: { currentToken: 1 } },
    { new: true }
  );

  const tokenNumber = updatedQueue.currentToken;

  const ticket = await Ticket.create({
    user: userId,
    queue: queueId,
    tokenNumber
  });

  return ticket;
};

module.exports = { joinQueueService };