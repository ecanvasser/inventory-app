const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carModelSchema = new Schema({
  make: { type: Schema.Types.ObjectId, ref: "Make", required: true },
  model: { type: String, required: true, unique: true },
});

const carModel = mongoose.model("CarModel", carModelSchema);

module.exports = carModel;
