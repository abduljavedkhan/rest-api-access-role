const mongoose = require("mongoose");

const operationSchema = new mongoose.Schema({
  postid: {
    type: String,
    required: true,
  },
  operation: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "adminrequest",
  },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const IACrud = mongoose.model("initiate_action_crud", operationSchema);

module.exports = IACrud;
