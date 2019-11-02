const mongoose = require("mongoose");

const admintSchema = new mongoose.Schema({
    name:String,
    email: String,

})

module.exports = mongoose.model("Admin", admintSchema);