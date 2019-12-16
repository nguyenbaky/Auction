const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    name       : String,
    sender     : String,
    comment    : [{type:mongoose.Schema.Types.ObjectId}],
    point      : Number
})

module.exports = mongoose.model("comment", commentSchema);