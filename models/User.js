const mongoose = require("mongoose");
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    ho_ten: String,
    dia_chi: String,
    diem: Number,
    username:String,
    email: String,
    password: String,
    dob:{type:Date}
})

module.exports = mongoose.model("User", userSchema);