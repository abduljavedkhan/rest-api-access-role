const express = require("express");
const route = express.Router();
const postController = require("../controllers/postController");
const userController = require("../controllers/userController");
const initiateController = require("../controllers/initiateController");
const actionController = require("../controllers/actionController");
//const use = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// USER API
route.post(
  "/api/user/posts",
  userController.checkIfLoggedin,
  userController.grantAccess("createOwn", "posts"),
  postController.createPost
);
route.delete(
  "/api/user/posts/:id",
  userController.checkIfLoggedin,
  userController.grantAccess("deleteOwn", "posts"),
  postController.delete
);
route.get(
  "/api/user/posts",
  userController.checkIfLoggedin,
  userController.grantAccess("readOwn", "posts"),
  postController.find
);

// admin initiate crud
route.post("/api/initiate-crud",  userController.checkIfLoggedin,
userController.grantAccess("createAny", "posts"),
initiateController.initoperation);

// super-admin action crud
route.get("/api/action-crud",  userController.checkIfLoggedin,
userController.grantAccess("readAny", "posts"), actionController.findAdminRequest);
route.post("/api/action-crud",  userController.checkIfLoggedin,
userController.grantAccess("createAny", "posts"), actionController.actionoperation);

// super admin API
route.get(
  "/api/supadmin/posts",
  userController.checkIfLoggedin,
  userController.grantAccess("readAny", "posts"),
  postController.find
);
route.post(
  "/api/supadmin/posts",
  userController.checkIfLoggedin,
  userController.grantAccess("createAny", "posts"),
  postController.create
);
route.delete(
  "/api/supadmin/posts/:id",
  userController.checkIfLoggedin,
  userController.grantAccess("deleteAny", "posts"),
  postController.delete
);
route.put(
  "/api/supadmin/posts/:id",
  userController.checkIfLoggedin,
  userController.grantAccess("updateAny", "posts"),
  postController.update
);

// user
route.post("/api/signup", userController.signup);
route.post("/api/login", userController.login);

module.exports = route;
