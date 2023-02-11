const Make = require("../models/carMake.model");

exports.get_makes = function (req, res) {
  Make.find().exec((err, result) => {
    if (err) {
      res.status(404).json("Error: " + err);
    }
    res.send(result);
  });
};

exports.add_make = function (req, res) {
  const newMake = new Make({
    name: req.body.name,
  });

  newMake.save((err) => {
    if (err) {
      res.status(404).json("Error: " + err);
    }
    res.json('Make added')
  });
};
