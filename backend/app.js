require("dotenv/config");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const api = process.env.API_URL;
const database = process.env.DATA_BASE_CONNECT;
const app = express();

const productsRouter = require("./routers/products");
const categoriesRouter = require("./routers/categories");
const usersRouter = require("./routers/users");
const orderRouter = require("./routers/orders");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

//middlerware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(authJwt());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.options("*", cors());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

//routers
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, orderRouter);

mongoose
  .connect(database, {
    dbName: "shop-database",
  })
  .then(() => {
    console.log("connect ok");
  })
  .catch((er) => {
    console.log(er);
  });

app.listen(3000, () => {
  console.log("Server Running");
});
