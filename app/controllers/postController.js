var request = require("request");
const userController = require("../controllers/userController");
const ResponseBuilder = require("../models/CustomResponse/ResponseBuilder");
const Response = require("../models/CustomResponse/Response");
const MESSAGES = require("../models/CustomResponse/ResponseMessages");
const CODES = require("../models/CustomResponse/ResponseCode");
const STATUS = { SUCCESS: "success", FAIL: "fail" };
// const validateRequest = require('./../models/ValidateRequest/ValidateRequest');

const Post = require("../models/posts");

// create and save new post
exports.createPost = (req, res) => {
  // validate request
  if (!req.body) {
    let errorResponse = new ResponseBuilder();
    errorResponse.setStatusCode(CODES.BAD_REQUEST);
    errorResponse.setStatus(STATUS.FAIL);
    errorResponse.setMessage(MESSAGES.MISSING);
    errorResponse.setData({});
    res.status(400).send(new Response(errorResponse));
    return;
  }

  // new post
  const post = new Post({
    message: req.body.message,
    username: req.body.username,
  });

  post
    .save(post)
    .then((data) => {
      let successResponse = new ResponseBuilder();
      successResponse.setStatusCode(CODES.SUCCESS);
      successResponse.setStatus(STATUS.SUCCESS);
      successResponse.setMessage(MESSAGES.USER_CREATED_SUCCESS);
      successResponse.setData(data);
      res.status(200).send(new Response(successResponse));
    })
    .catch((err) => {
      console.log("Create Post error " + err.message);
      let errorResponse = new ResponseBuilder();
      errorResponse.setStatusCode(CODES.INTERNAL_SERVER_ERROR);
      errorResponse.setStatus(STATUS.FAIL);
      errorResponse.setMessage(err.message || MESSAGES.INTERNAL_SERVER_ERROR);
      errorResponse.setData({});
      res.status(500).send(new Response(errorResponse));
    });
};

// admin request to Super-Admin
exports.create = (req, res) => {
  // new post
  const post = new Post({
    message: req.body.message,
    username: req.body.username,
  });

  // save post in the database
  post
    .save(post)
    .then((data) => {
      let successResponse = new ResponseBuilder();
      successResponse.setStatusCode(CODES.SUCCESS);
      successResponse.setStatus(STATUS.SUCCESS);
      successResponse.setMessage(MESSAGES.USER_CREATED_SUCCESS);
      successResponse.setData(data);
      res.status(200).send(new Response(successResponse));
    })
    .catch((err) => {
      console.log("Create Post error " + err.message);
      let errorResponse = new ResponseBuilder();
      errorResponse.setStatusCode(CODES.INTERNAL_SERVER_ERROR);
      errorResponse.setStatus(STATUS.FAIL);
      errorResponse.setMessage(err.message || MESSAGES.INTERNAL_SERVER_ERROR);
      errorResponse.setData({});
      res.status(500).send(new Response(errorResponse));
    });
};

// retrieve and return all post/ retrive and return a single post
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Post.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found post with id " + id });
        } else {
          res.status(200).send({
            message: "Content retrieved Successfully! ",
            data: data,
          });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving post with id " + id });
      });
  } else {
    Post.find()
      .then((data) => {
        console.log("reached");
        res.status(200).send({
          message: "List of Post ",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occurred while retriving post list",
        });
      });
  }
};

// Update by Post id
exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Content to update can not be empty" });
  }

  const id = req.params.id;
  Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot Update post with ${id}. !` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error while Updating Content " });
    });
};

// Delete a Post with specified Post id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Post.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "Post was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id,
      });
    });
};
