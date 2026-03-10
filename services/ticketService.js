
const Ticket = require("../models/Ticket");
const Queue = require("../models/Queue");

const getQueuePosition = async (queueId, userId) => {

  const ticket = await Ticket.findOne({
    queueId,
    userId,
    status: "waiting"
  });

  if (!ticket) return null;

  const peopleAhead = await Ticket.countDocuments({
    queueId,
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
  getQueuePosition
};