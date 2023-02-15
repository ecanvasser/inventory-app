const Product = require("../models/product.model");

exports.get_products = function (req, res) {
  Product.find().populate("model category").exec((err, result) => {
    if (err) {
      res.status(404).json("Error: " + err);
    }
    res.send(result);
  });
};

exports.add_product = function (req, res) {
  const product = new Product({
    model: req.body.model,
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
  });

  product.save((err) => {
    if (err) {
      res.status(404).json("Error: " + err);
    }
    res.send("Product Added");
  });
};
