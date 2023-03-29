const transectionModel = require("../models/transectionModel");
const moment = require("moment");
const transectionService = require("../services/transectionService");

const getAllTransection = async (req, res) => {
  try {
    return await transectionService.getAllTransectionService(
      req.body.userid,
      req.body.frequency,
      req.body.selectedDate,
      req.body.type,
      res
    );
  } catch (err) {
    // res.status(500).send("Internal Server Error");
  }
};

const deleteTransection = async (req, res) => {
  try {
    return await transectionService.deleteTransectionService(
      req.body.transacationId,
      res
    );
  } catch (err) {
    // res.status(500).send("Internal Server Error");
  }
};
const editTransection = async (req, res) => {
  try {
    return await transectionService.deleteTransectionService(
      req.body.transacationId,
      req.body.payload,
      res
    );
  } catch (err) {
    // res.status(500).send("Internal Server Error");
  }
};

const addTransection = async (req, res) => {
  try {
    return await transectionService.addTransectionService(req.body, res);
  } catch (err) {
    // res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllTransection,
  addTransection,
  editTransection,
  deleteTransection,
};
