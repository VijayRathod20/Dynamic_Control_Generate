const optionQuery = require("../repository/queries");

const addOptionValue = async (req, res) => {
  const options = req.body;
  const data = await optionQuery.insertOption(options);
  res.json(data);
};

module.exports = {
  addOptionValue,
};
