const express = require("express");
const mongoose = require("mongoose");

//Routers
const customer = require("./api/routes/customer");

const app = express();

//database Connection
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
mongoose
  .connect("mongodb://localhost:27017/fullstack", mongoOptions)
  .then((res) => console.log("Connected to mongodb..."))
  .catch((err) => console.log("MongoDB connection error:", err));

//handling cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token"
  );
  res.header("Access-Control-Expose-Headers", "*, Authorization");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//middlewares
app.use(express.json());

app.use("/api/customer", customer);

app.get("/", (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Authorization-Server API",
  });
});

app.use((req, res, next) => {
  const error = new Error("requesting API not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      status: "failure",
      message: error.message,
    },
  });
});

module.exports = app;
