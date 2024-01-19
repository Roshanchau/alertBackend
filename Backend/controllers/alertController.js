const Alert = require("../models/alertModel");

const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.status(200).json(alerts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createAlerts = async (req, res) => {
  const { alert } = req.body;
  let emptyFields = [];

  if (!alert) {
    emptyFields.push("alert");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "please fill in all the fields", emptyFields });
  }
  try {
    const warning = await Alert.create({ alert });
    console.log(warning);
    res.status(200).json(warning);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAlerts, createAlerts };
