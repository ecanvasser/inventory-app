const Model = require("../models/carModel.model");

exports.get_carmodels = function (req, res) {
  Model.find()
    .populate("make")
    .exec((err, result) => {
      if (err) {
        res.status(404).json("Error: " + err);
      }
      res.send(
        result.map((obj) => {
          return {
            _id: obj._id,
            _makeid: obj.make._id,
            make: obj.make.name,
            model: obj.model,
          };
        })
      );
    });
};

exports.add_carmodel = function (req, res) {
  const model = new Model({
    make: req.body.make,
    model: req.body.model,
  });

  model.save((err) => {
    if (err) {
      res.status(404).json("Error: " + err);
    }
    res.send("Model added");
  });
};

exports.edit_carmodel = function (req, res) {
  const editModel = {
    make: req.body.make,
    model: req.body.model,
  };
  Model.findByIdAndUpdate(req.params.id, editModel, (err) => {
    if (err) {
      res.status(404).json(err);
    }
    res.send("Model updated");
  });
};
