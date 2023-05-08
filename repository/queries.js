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

module.exports = {
  insertSelect,
  insertOption,
  getSelect,
  getSelectedOption,
};
