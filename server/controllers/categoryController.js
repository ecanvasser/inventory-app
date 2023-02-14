const Category = require("../models/category.model");

exports.get_categories = function (req, res) {
  Category.find().exec((err, result) => {
    if (err) {
      res.status(404).json("Error: " + err);
    }
    res.send(result);
  });
};

exports.add_category = function (req, res) {
  const category = new Category({
    name: req.body.name,
  });

  category.save((err) => {
    if (err) {
      res.status(404).json("Error: " + err);
    }
    res.send("Category added");
  });
};
