const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const makeSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true, minLength: 2 },
});

const Make = mongoose.model("Make", makeSchema);

module.exports = Make;