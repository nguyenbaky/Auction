var express = require('express')
var router = express.Router()

// Hiện thông tin sản phẩm đang bán
router.get("/:sellerID",function(req,res){
    res.render("home",{page:"product",seller:true});
})
// Hiện thông tin sản phẩm đã bán
router.get("/sold/:sellerID",function(req,res){
    res.render("home",{page:"sold_product",seller:true});
})

// Thêm sản phẩm bán
router.get("/add/:sellerID",function(req,res){
    res.render("pages/add_product",{page:"add_product",seller:true});
})

module.exports = router