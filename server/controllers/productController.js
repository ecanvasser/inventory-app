const Product = require("../models/product.model");

exports.get_products = function (req, res) {
  Product.find()
    .populate({ path: "category", select: "name" })
    .populate({
      path: "model",
      select: "model",
      populate: { path: "make", model: "Make", select: "name" },
    })
    .exec((err, result) => {
      if (err) {
        res.status(404).json("Error: " + err);
      }
      res.send(
        result.map((obj) => {
          return {
            make: obj.model.make.name,
            model: obj.model.model,
            category: obj.category.name,
            name: obj.name,
            price: obj.price,
            quantity: obj.quantity,
          };
        })
      );
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
