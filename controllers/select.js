const selectQuery = require("../repository/queries");
const userModel = require("../models").user;
const Form = require("../models").Form;
const RequestIp = require("request-ip");

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
  var clientIp = RequestIp.getClientIp(req);
  console.log(clientIp);
  const sid = req.query.sid;
  const type = req.query.type;
  const data = await selectQuery.getSelectedOption(sid);
  const multiSelect = req.query.multiSelect || "";
  // res.json(data);

  if (sid == 4) {
    const data2 = await userModel.findAll();
    if (type == "select") {
      var select = "";
      select += `<select name="select" ${multiSelect}>`;
      for (var i = 0; i < data2.length; i++) {
        select += `<option value="${data2[i].name}">${data2[i].name}</option>`;
      }
      select += `</select>`;
      return res.send(select);
    }
    if (type == "radio") {
      var radio = "";
      for (var i = 0; i < data2.length; i++) {
        radio += `<input type="radio" name="radio" value="${data2[i].name}" /> ${data2[i].name}</br>`;
      }
      return res.send(radio);
    }
    if (type == "checkbox") {
      var checkbox = "";
      for (var i = 0; i < data2.length; i++) {
        checkbox += `<input type="checkbox" name="checkbox" value="${data2[i].name}" /> ${data2[i].name}</br>`;
      }
      return res.send(checkbox);
    }
  }

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

const createForm = async (req, res) => {
  const formName = req.body.formName;
  const formFields = JSON.stringify(req.body.formFields);

  const data = await Form.create({
    formName: formName,
    formFields: formFields,
  });

  // res.json(data);

  if (data) {
    var form = "";
    const formFields = JSON.parse(data.formFields);
    form += `<form action="/submitForm" method="post">`;
    form += `<h1>${data.formName}</h1>`;
    for (var i = 0; i < formFields.length; i++) {
      if (formFields[i].type == "text") {
        form += `<label>${formFields[i].label}</label>`;
        form += `<input type="text" name="${formFields[i].name}" />`;
      }
      if (formFields[i].type == "radio") {
        form += `<label>${formFields[i].label}</label>`;
        for (var j = 0; j < formFields[i].options.length; j++) {
          form += `<input type="radio" name="${formFields[i].name}" value="${formFields[i].options[j].name}" /> ${formFields[i].options[j].name}`;
        }
      }
      if (formFields[i].type == "checkbox") {
        form += `<label>${formFields[i].label}</label>`;
        for (var j = 0; j < formFields[i].options.length; j++) {
          form += `<input type="checkbox" name="${formFields[i].name}" value="${formFields[i].options[j].name}" /> ${formFields[i].options[j].name}`;
        }
      }
      if (formFields[i].type == "select") {
        form += `<label>${formFields[i].label}</label>`;
        form += `<select name="${formFields[i].name}">`;
        for (var j = 0; j < formFields[i].options.length; j++) {
          form += `<option value="${formFields[i].options[j].name}" /> ${formFields[i].options[j].name} </option>`;
        }
        form += `</select>`;
      }
    }
    form += `<input type="submit" value="Submit" />`;
    form += `</form>`;
  }
  res.send(form);
};

const getForm = async (req, res) => {
  res.render("create_form");
};

module.exports = {
  addSelectName,
  getSelect,
  getSelectedOption,
  deleteSelect,
  createForm,
  getForm,
};
