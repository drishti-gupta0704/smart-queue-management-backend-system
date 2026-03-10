
const Ticket = require("../models/Ticket");
const Queue = require("../models/Queue");

// JOIN QUEUE
const joinQueueService = async (userId, queueId) => {

  const queue = await Queue.findById(queueId);

  if (!queue) {
    throw new Error("Queue not found");
  }

  const waitingCount = await Ticket.countDocuments({
    queue: queueId,
    status: "waiting"
  });

  if (waitingCount >= queue.maxSize) {
    throw new Error("Queue is full");
  }

  const existingTicket = await Ticket.findOne({
    user: userId,
    queue: queueId,
    status: { $in: ["waiting", "serving"] }
  });

  if (existingTicket) {
    throw new Error("User already in this queue");
  }

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


// GET QUEUE POSITION
const getQueuePosition = async (queueId, userId) => {

  const ticket = await Ticket.findOne({
    queue: queueId,
    user: userId,
    status: "waiting"
  });

  if (!ticket) return null;

  const peopleAhead = await Ticket.countDocuments({
    queue: queueId,
    tokenNumber: { $lt: ticket.tokenNumber },
    status: "waiting"
  });

  const queue = await Queue.findById(queueId);

  const waitTime = peopleAhead * queue.avgServiceTime;

  return {
    position: peopleAhead + 1,
    peopleAhead,
    waitTime
  };

};

module.exports = {
  joinQueueService,
  getQueuePosition
};