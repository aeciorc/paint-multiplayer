const path = require("path");
const express = require("express");
const morgan = require("morgan");

const errorHandler = require("./middleware/error");
const indexRouter = require("./routes/index");

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);

app.use(errorHandler);

module.exports = app;
