const pong = (req, res) => {
  res.status(200).json({
    error: false,
    message: "pong",
  });
};

module.exports = pong;
