
const Queue = require("../models/Queue");

const createQueue = async (req, res) => {
  try {

    const { name, location, maxSize } = req.body;

    const queue = await Queue.create({
      name,
      location,
      maxSize,
      createdBy: req.user._id
    });

    res.status(201).json({
      message: "Queue created successfully",
      queue
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getQueues = async (req, res) => {
  try {

    const queues = await Queue.find();

    res.status(200).json(queues);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createQueue,
  getQueues
};