const selectQuery = require("../repository/queries");

const addSelectName = async (req, res) => {
  const select_name = req.body;
  const data = await selectQuery.insertSelect(select_name);
  res.json(data);
};

const getSelect = async (req, res) => {
  const sid = req.query.sid;
  const type = req.query.type;
  const data = await selectQuery.getSelect(sid);
  const multiSelect = req.query.multiSelect || "";
  console.log(multiSelect);

  console.log(type);

  if (type == "radio") {
    var radio = "";
    for (var i = 0; i < data.length; i++) {
      radio += `<input type="radio" name="radio" value="${data[i].option_value}" /> ${data[i].option_value}`;
    }
    console.log(radio);
    res.send(radio);
  }

  if (type == "checkbox") {
    var checkbox = "";
    for (var i = 0; i < data.length; i++) {
      checkbox += `<input type="checkbox" name="checkbox" value="${data[i].option_value}" /> ${data[i].option_value}`;
    }
    console.log(checkbox);
    res.send(checkbox);
  }

  if (type == "select") {
    var select = "";
    select += `<select name="select" ${multiSelect}>`;
    for (var i = 0; i < data.length; i++) {
      select += `<option value="${data[i].option_value}">${data[i].option_value}</option>`;
    }
    select += `</select>`;
    console.log(select);
    res.send(select);
  }
};

const getSelectedOption = async (req, res) => {
  const sid = req.query.sid;
  console.log(sid);
  const type = req.query.type;
  const data = await selectQuery.getSelectedOption(sid);
  const multiSelect = req.query.multiSelect || "";
  // res.json(data);

  if (type == "radio") {
    var radio = "";
    radio += `<label>Select ${data.select_name} :- </label>`;
    for (var i = 0; i < data.option_masters.length; i++) {
      radio += `<input type="radio" name="radio" value="${data.option_masters[i].option_value}" /> ${data.option_masters[i].option_value}`;
    }
    console.log(radio);
    res.send(radio);
  }

  if (type == "checkbox") {
    var checkbox = "";
    checkbox += `<label>Select ${data.select_name} :- </label>`;
    for (var i = 0; i < data.option_masters.length; i++) {
      checkbox += `<input type="checkbox" name="checkbox" value="${data.option_masters[i].option_value}" /> ${data.option_masters[i].option_value}`;
    }
    console.log(checkbox);
    res.send(checkbox);
  }

  if (type == "select") {
    var select = "";
    select += `<label>Select ${data.select_name} :- </label>`;
    select += `<select name="select" ${multiSelect}>`;
    for (var i = 0; i < data.option_masters.length; i++) {
      select += `<option value="${data.option_masters[i].option_value}">${data.option_masters[i].option_value}</option>`;
    }
    select += `</select>`;
    console.log(select);
    res.send(select);
  }
};

const deleteSelect = async (req, res) => {
  const sid = req.query.sid;
  const data = await selectQuery.deleteSelect(sid);
  res.json(data);
};

module.exports = {
  addSelectName,
  getSelect,
  getSelectedOption,
  deleteSelect,
};
