const express = require("express");
const app = express();
const ResponseBuilder = require("../models/CustomResponse/ResponseBuilder");
const Response = require("../models/CustomResponse/Response");
const MESSAGES = require("../models/CustomResponse/ResponseMessages");
const CODES = require("../models/CustomResponse/ResponseCode");
const STATUS = { SUCCESS: "success", FAIL: "fail" };

const InitOP = require("../models/initiate-action-crud");

exports.initoperation = async (req, res, next) => {
  // new reqs
  const newReq = new InitOP({
    postid: req.body.postid,
    operation: req.body.operation,
    status: "adminrequest",
    createdAt: Date.now,
  });

  InitOP.save(newReq)
    .then((data) => {
      let successResponse = new ResponseBuilder();
      successResponse.setStatusCode(CODES.SUCCESS);
      successResponse.setStatus(STATUS.SUCCESS);
      successResponse.setMessage(`Admin Request Initiated`);
      successResponse.setData(data);
      res.status(200).send(new Response(successResponse));
    })
    .catch((err) => {
      console.log("Create Initiate Req error " + err.message);
      let errorResponse = new ResponseBuilder();
      errorResponse.setStatusCode(CODES.INTERNAL_SERVER_ERROR);
      errorResponse.setStatus(STATUS.FAIL);
      errorResponse.setMessage(err.message || MESSAGES.INTERNAL_SERVER_ERROR);
      errorResponse.setData({});
      res.status(500).send(new Response(errorResponse));
    });
};
