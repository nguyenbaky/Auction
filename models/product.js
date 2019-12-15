const mongoose = require("mongoose");
var SchemaTypes = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
    name            : String,
    images          : [{type:mongoose.Schema.Types.String}],
    Gia_Khoi_Diem   : Number,
    Buoc_gia        : Number,
    Gia_Hien_Tai    : Number,
    date_begin      : String,
    date_end        : String,
    description     : String,
    Seller          : String,
    Buyer           : String,
    categoryID      : mongoose.Schema.ObjectId,
    thoi_diem       : [{type:mongoose.Schema.Types.String}],
    Bidder          : [{type:mongoose.Schema.Types.String}],
    Bid_price       : [{type:mongoose.Schema.Types.Number}],
    Num_bid         : Number,
})

module.exports = mongoose.model("Product", productSchema);