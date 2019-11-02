const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    ho_ten: String,
    dia_chi: String,
    diem: Number,
    username:String,
    email: String,
    password: String,
    dob:{type:Date},
    level: Number,
    is_update: Boolean
})

module.exports = mongoose.model("User", userSchema);