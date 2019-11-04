const mongoose = require("mongoose");

const admintSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

module.exports = mongoose.model("Admin", admintSchema);