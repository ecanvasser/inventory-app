const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const db_uri = process.env.MONGODB_URI;
mongoose.connect(db_uri);

mongoose.connection.once("open", () => {
  console.log("DB connection successful");
});

const carmakeRouter = require("./routes/carMake");
const carmodelRouter = require("./routes/carModel");
const categoryRouter = require("./routes/category");

app.use("/makes", carmakeRouter);
app.use("/models", carmodelRouter);
app.use("/product-categories", categoryRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
