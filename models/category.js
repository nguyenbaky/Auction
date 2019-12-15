const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name       : String,
    productID  : [{type:mongoose.Schema.Types.ObjectId}],
    cateID     : mongoose.Schema.ObjectId
})

module.exports = mongoose.model("category", categorySchema);