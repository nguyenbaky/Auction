var express = require('express')
var router = express.Router()
const Users = require("../models/User")
const Cates = require("../models/cate")
const Product = require("../models/product")
//  /auction
// auction/:user :Danh sách sản phẩm đau giá 
router.get("/:userID",async function(req,res){
    var id = req.params.userID
    if(res.locals.id !== id) return res.redirect("/auction/"+res.locals.id)

    var d = new Date();
    var y = d.getFullYear()
    var m = d.getMonth() + 1
    var day = d.getDate() 
    var h = d.getHours()
    var mi = d.getMinutes()
    var n = y+"-"+m+"-"+day+" "+h+":"+mi

    var [user,cates] = await Promise.all([
        Users.findOne({_id:res.locals.id}),
        Cates.find({})
    ])
    var products = await Product.find({
        _id      : {$in : sp_Dau_Gia },
        date_end : {$gt : n}
    })
    res.render("home",{page:"product_auction",user,cates,products})
})

// auction/success/:user :Danh sách sản phẩm đấu giá thành công
router.get("/success/:userID",async function(req,res){
    var id = req.params.userID
    if(res.locals.id !== id) return res.redirect("/auction/success"+res.locals.id)

    var d = new Date();
    var y = d.getFullYear()
    var m = d.getMonth() + 1
    var day = d.getDate() 
    var h = d.getHours()
    var mi = d.getMinutes()
    var n = y+"-"+m+"-"+day+" "+h+":"+mi

    var [user,cates] = await Promise.all([
        Users.findOne({_id:res.locals.id}),
        Cates.find({})
    ])
    var products = await Product.find({
        _id      : {$in : sp_Dau_Gia },
        date_end : {$lt : n}
    })
    res.render("home",{page:"success",user,cates,products});
})


module.exports = router