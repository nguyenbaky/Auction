const mongoose = require("mongoose");
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
    name:String,
    image:String,
    price: Number,
    date_begin: {type:Date},
    date_end: {type:Date},
    info: String,
    description: String,
})

module.exports = mongoose.model("Product", productSchema);