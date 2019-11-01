const mongoose = require("mongoose");

const cateSchema = new mongoose.Schema({
    name:String,
    cateID: [{type:mongoose.Schema.Types.ObjectId}]
})

module.exports = mongoose.model("Cate", cateSchema);