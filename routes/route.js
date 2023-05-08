const express = require("express");
const router = express.Router();
const selectController = require("../controllers/select");
const optionController = require("../controllers/option");

router.post("/addSelectName", selectController.addSelectName);

router.post("/addOption", optionController.addOptionValue);

router.get("/getSelect", selectController.getSelect);

router.get("/getSelectedOption", selectController.getSelectedOption);

router.put("/updateOption", optionController.updateOptionValue);

router.delete("/deleteOption", optionController.deleteOptionValue);

router.delete("/deleteSelect", selectController.deleteSelect);

module.exports = router;
