
const { joinQueueService } = require("../services/queueService");

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

module.exports = { joinQueue };