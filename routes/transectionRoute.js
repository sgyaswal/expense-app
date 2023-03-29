const express = require("express");
const {
  addTransection,
  getAllTransection,
  editTransection,
  deleteTransection,
} = require("../controllers/transectionController");
const authorization = require("../middlewares/authorization");
const validateRequest = require('../middlewares/errorHandler');

//router object
const router = express.Router();

//routes
//add transection POST MEthod
router.post("/add-transection", authorization, addTransection);
//Edit transection POST MEthod
router.post("/edit-transection", authorization, editTransection);
//Delete transection POST MEthod
router.post("/delete-transection", authorization, deleteTransection);
//get transections
router.post("/get-transection", authorization, getAllTransection);

module.exports = router;
