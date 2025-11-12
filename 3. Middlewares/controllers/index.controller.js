const indexController = (_, res) => {
    res.json({ message: "Starting with middleware" });
};

module.exports = { indexController };