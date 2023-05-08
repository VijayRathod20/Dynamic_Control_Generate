const Model = require("../models");
const selectMaster = Model.select_master;
const optionMaster = Model.option_master;
console.log(selectMaster);
console.log(optionMaster);

const insertSelect = async (select_name) => {
  const result = await selectMaster.create(select_name);
  return result;
};

const insertOption = async (options) => {
  const result = await optionMaster.bulkCreate(options);
  return result;
};

const getSelect = async (sid) => {
  const result = await optionMaster.findAll({
    where: {
      select_id: sid,
    },
  });
  return result;
};

const getSelectedOption = async (sid) => {
  const result = await selectMaster.findByPk(sid, {
    include: [optionMaster],
  });
  return result;
};

const updateOption = async (options, option_value) => {
  const result = await optionMaster.update(options, {
    where: {
      option_value: option_value,
    },
  });
  return result;
};

const deleteOption = async (option_value) => {
  const result = await optionMaster.destroy({
    where: {
      option_value: option_value,
    },
  });
  return result;
};

const deleteSelect = async (sid) => {
  try {
    const result = await selectMaster.destroy({
      where: {
        id: sid,
      },
    });
    return result;
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return "Delete option first";
    }
  }
};

module.exports = {
  insertSelect,
  insertOption,
  getSelect,
  getSelectedOption,
  updateOption,
  deleteOption,
  deleteSelect,
};
