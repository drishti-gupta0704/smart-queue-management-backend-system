
const Queue = require("../models/Queue");

const createQueueService = async (data) => {
  return await Queue.create(data);
};

const getQueuesService = async () => {
  return await Queue.find();
};

module.exports = {
  createQueueService,
  getQueuesService
};