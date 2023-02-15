const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    model: {type: Schema.Types.ObjectId, ref: "CarModel", required: true},
    category: {type: Schema.Types.ObjectId, ref: "Category", required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true}
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;