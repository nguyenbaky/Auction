const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username      : String,    
    email         : String,
    ho_ten        : String,
    is_update     : Number,
    dia_chi       : String,
    password      : String,
    sp_Dau_Gia    : [{type:mongoose.Schema.Types.ObjectId}],
    sp_Yeu_Thich  : [{type:mongoose.Schema.Types.ObjectId}],
    sp_Ban        : [{type:mongoose.Schema.Types.ObjectId}],
    level         : Number,
    dob           : String,
    comment       : [{type:mongoose.Schema.Types.String}],
    diem_danh_gia : Number,
})

module.exports = mongoose.model("User", userSchema);