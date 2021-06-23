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

const IACrud = mongoose.model("IACrud", operationSchema);

module.exports = IACrud;
