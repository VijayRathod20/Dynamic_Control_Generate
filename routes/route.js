const express = require("express");
const router = express.Router();
const selectController = require("../controllers/select");
const optionController = require("../controllers/option");

router.post("/addSelectName", selectController.addSelectName);

router.post("/addOption", optionController.addOptionValue);

router.get("/getSelect", selectController.getSelect);

router.get("/getSelectedOption", selectController.getSelectedOption);

module.exports = router;
