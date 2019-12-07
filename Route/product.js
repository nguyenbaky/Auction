var express = require('express')
var router = express.Router()
const Users = require("../models/User")
const Cates = require("../models/cate")

// Hiện thông tin sản phẩm đang bán
router.get("/:sellerID",async function(req,res){
    var id = req.params.sellerID
    if(res.locals.id !== id) return res.redirect("/product/"+res.locals.id)
    var user,cates
    await Users.findOne({_id:res.locals.id}).then(u => user = u)
    await Cates.find({}).then(c => cates = c) 
    res.render("home",{page:"product",user,cates});
})
// Hiện thông tin sản phẩm đã bán
router.get("/sold/:sellerID",async function(req,res){
    var id = req.params.sellerID
    if(res.locals.id !== id) return res.redirect("/product/sold/"+res.locals.id)
    var user,cates
    await Users.findOne({_id:res.locals.id}).then(u => user = u)
    await Cates.find({}).then(c => cates = c)
    res.render("home",{page:"sold_product",user,cates});
})

// Thêm sản phẩm bán
router.get("/add/:sellerID",async function(req,res){
    var id = req.params.sellerID
    if(res.locals.id !== id) return res.redirect("/product/add/"+res.locals.id)
    res.render("pages/add_product",{page:"add_product",user,cates});
})

module.exports = router