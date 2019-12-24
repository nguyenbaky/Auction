const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    name       : String,
    sender     : String,
    comment    : String,
    point      : Number
})

module.exports = mongoose.model("comment", commentSchema);