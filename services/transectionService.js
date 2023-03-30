const transectionModel = require("../models/transectionModel");
const MyException = require("../exceptions/MyException");
const moment = require("moment");

const getAllTransectionService = async (userid,frequency, selectedDate, type, res) => {
  try {
    const transections = await transectionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json({ success: true, status: 200, data: transections });
  } catch (error) {
    if (error instanceof MyException) {
      res
        .status(error?.status)
        .json({ error: error?.message, status: error?.status });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const deleteTransectionService = async (transacationId, res) => {
  try {
    await transectionModel.findOneAndDelete({ _id: transacationId });
    res.status(200).json({ success: true, status: 200 });
  } catch (error) {
    if (error instanceof MyException) {
      res
        .status(error?.status)
        .json({ error: error?.message, status: error?.status });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const editTransectionService = async (transacationId, payload, res) => {
  try {
    await transectionModel.findOneAndUpdate(
      { _id: transacationId },
      payload
    );
    res
      .status(200)
      .json({ success: true, status: 200, data: req.body.payload });
  } catch (error) {
    if (error instanceof MyException) {
      res
        .status(error?.status)
        .json({ error: error?.message, status: error?.status });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const addTransectionService = async (body, res) => {
  try {
    if(!body.amount || !body.userid || !body.date || !body.type || !body.reference || !body.category){
      throw new MyException("Please provide all required field.")
    }
    const newTransection = new transectionModel(body);
    await newTransection.save();
    res.status(200).json({ success: true, status: 200, data: newTransection });
  } catch (error) {
    if (error instanceof MyException) {
      res
        .status(error?.status)
        .json({ error: error?.message, status: error?.status });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = {
    getAllTransectionService,
    deleteTransectionService,
    editTransectionService,
  addTransectionService,
};
