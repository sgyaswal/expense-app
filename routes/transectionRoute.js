const express = require("express");
const {
  addTransection,
  getAllTransection,
} = require("../controllers/transectionController");

//router object
const router = express.Router();

//add transection POST
router.post("/add-transection", addTransection);

//get transection GET
router.post("/get-transection", getAllTransection);

module.exports = router;
