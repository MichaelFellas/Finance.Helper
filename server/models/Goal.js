const { Schema, Types } = require("mongoose");

const goalSchema = new Schema({
  goalName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  progress: {
    type: Number,
    required: true,
  },
  dateBuy: {
    type: Date,
    required: false,
  },
});

module.exports = goalSchema;
