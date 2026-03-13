
// services/ticketService.js
const Ticket = require("../models/Ticket");
const Queue = require("../models/Queue");

// ---------------- User Services ----------------

// JOIN QUEUE
const joinQueueService = async (userId, queueId) => {
  const queue = await Queue.findById(queueId);
  if (!queue) throw new Error("Queue not found");

  const waitingCount = await Ticket.countDocuments({
    queue: queueId,
    status: "waiting"
  });

  if (waitingCount >= queue.maxSize) throw new Error("Queue is full");

  const existingTicket = await Ticket.findOne({
    user: userId,
    queue: queueId,
    status: { $in: ["waiting", "serving"] }
  });

  if (existingTicket) throw new Error("User already in this queue");

  const updatedQueue = await Queue.findByIdAndUpdate(
    queueId,
    { $inc: { currentToken: 1 } },
    { new: true }
  );

  const ticket = await Ticket.create({
    user: userId,
    queue: queueId,
    tokenNumber: updatedQueue.currentToken
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

  return {
    position: peopleAhead + 1,
    peopleAhead,
    waitTime: peopleAhead * queue.avgServiceTime
  };
};

// GET ALL TICKETS OF LOGGED-IN USER
const getUserTicketsService = async (userId) => {
  return await Ticket.find({ user: userId }).populate("queue", "name location");
};

// ---------------- Admin Services ----------------

// GET ALL TICKETS IN A QUEUE
const getTicketsByQueueService = async (queueId) => {
  return await Ticket.find({ queue: queueId }).populate("user", "name email");
};

// UPDATE TICKET STATUS
const updateTicketStatusService = async (ticketId, status) => {
  const ticket = await Ticket.findByIdAndUpdate(
    ticketId,
    { status },
    { new: true }
  );

  if (!ticket) throw new Error("Ticket not found");

  return ticket;
};

module.exports = {
  // User
  joinQueueService,
  getQueuePosition,
  getUserTicketsService,

  // Admin
  getTicketsByQueueService,
  updateTicketStatusService
};