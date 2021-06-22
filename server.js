const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();

const ExpressBrute = require("express-brute");
const connectDB = require("./app/database/connection");
const ResponseBuilder = require("./app/models/CustomResponse/ResponseBuilder");
const Response = require("./app/models/CustomResponse/Response");
const CODES = require("./app/models/CustomResponse/ResponseCode");
const User = require("./app/models/users");

const PORT = process.env.PORT || 4321;
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Access-Control-Allow-Origin", "Content-Type"],
};

// mongodb connection
connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middle ware
app.use(async function (req, res, next) {
  if (req.headers["authorization"]) {
    try {
      const accessToken = req.headers["authorization"];
      const { userId, exp } = await jwt.verify(
        accessToken,
        process.env.JWT_SECRET
      );
      console.log("userid " + userId);
      // If token has expired
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one",
        });
      }
      res.locals.loggedInUser = await User.findById(userId);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});
// load routers
app.use("/", require("./app/routes/approutes"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Rest-API-Assignments." });
});

//catch 404
app.use(function (req, res, next) {
  let errorResponse = new ResponseBuilder();
  errorResponse.setStatusCode(CODES.NOT_FOUND);
  errorResponse.setStatus("fail");
  errorResponse.setMessage(`Resource Not Found.`);
  errorResponse.setData({});
  res.status(404).send(new Response(errorResponse));
});

app.use(function (err, req, res, next) {
  console.error("Global error catch " + err.message);
  let errorResponse = new ResponseBuilder();
  errorResponse.setStatusCode(CODES.INTERNAL_SERVER_ERROR);
  errorResponse.setStatus("fail");
  errorResponse.setMessage(`Internal Server Error`);
  errorResponse.setData({});
  res.status(500).send(new Response(errorResponse));
});

const port = process.env.PORT||4321

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
