const express = require("express");
const app = express();
const ResponseBuilder = require("../models/CustomResponse/ResponseBuilder");
const Response = require("../models/CustomResponse/Response");
const MESSAGES = require("../models/CustomResponse/ResponseMessages");
const CODES = require("../models/CustomResponse/ResponseCode");
const STATUS = { SUCCESS: "success", FAIL: "fail" };
const IACrud = require("../models/initiateactioncrud");

exports.findAdminRequest = async (req, res, next) => {
  IACrud.find({ status: "adminrequest" })
    .then((data) => {
      res.status(200).send({
        message: "List of request ",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Occurred while retriving post list",
      });
    });
};

exports.actionoperation = async (req, res, next) => {
  // new reqs
  const newReq = new IACrud({
    postid: req.body.postid,
    operation: req.body.operation,
    status: req.body.operation || "done", // default is done if not rejetected
    updatedAt: new Date(),
  });

  newReq.save(newReq)
    .then((data) => {
      let successResponse = new ResponseBuilder();
      successResponse.setStatusCode(CODES.SUCCESS);
      successResponse.setStatus(STATUS.SUCCESS);
      successResponse.setMessage(`Super Admin Operation Successful`);
      successResponse.setData(data);
      res.status(200).send(new Response(successResponse));
    })
    .catch((err) => {
      console.log("Action Req error " + err.message);
      let errorResponse = new ResponseBuilder();
      errorResponse.setStatusCode(CODES.INTERNAL_SERVER_ERROR);
      errorResponse.setStatus(STATUS.FAIL);
      errorResponse.setMessage(err.message || MESSAGES.INTERNAL_SERVER_ERROR);
      errorResponse.setData({});
      res.status(500).send(new Response(errorResponse));
    });
};
