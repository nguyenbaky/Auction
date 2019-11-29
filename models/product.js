const mongoose = require("mongoose");
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
    name:String,
    images: [{type:mongoose.Schema.Types.String}],
    Gia_Khoi_Diem: Number,
    Buoc_gia : Number,
    Gia_Mua_Ngay: Number,
    date_begin: {type:Date},
    date_end: {type:Date},
    description: String,
    
})

module.exports = mongoose.model("Product", productSchema);