var express = require('express')
var router = express.Router()

// view category
router.get("/category",function(req,res){
    res.render("home",{page:"category",user:true});
})

// /chi-tiet-san-pham/:id_product
router.get("/chi-tiet-san-pham",function(req,res){
    res.render("home",{page:"product_detail",user:true});
})

module.exports = router