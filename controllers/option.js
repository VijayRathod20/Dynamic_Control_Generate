const optionQuery = require("../repository/queries");

const addOptionValue = async (req, res) => {
  const options = req.body;
  const data = await optionQuery.insertOption(options);
  res.json(data);
};

const updateOptionValue = async (req, res) => {
  const options = req.body;
  const option_value = req.query.option_value;
  const data = await optionQuery.updateOption(options, option_value);
  res.json(data);
};

const deleteOptionValue = async (req, res) => {
  const option_value = req.query.option_value;
  const data = await optionQuery.deleteOption(option_value);
  res.json(data);
};

module.exports = {
  addOptionValue,
  updateOptionValue,
  deleteOptionValue,
};
