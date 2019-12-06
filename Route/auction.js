var express = require('express')
var router = express.Router()
const Users = require("../models/User")
const Cates = require("../models/cate")

//  /auction
// auction/:user :Danh sách sản phẩm đang giá thành công
router.get("/:userID",async function(req,res){
    var user,cates
    await Users.findOne({_id:res.locals.id}).then(u => user = u)
    await Cates.find({}).then(c => cates = c)
    res.render("home",{page:"product_auction",user,cates})
})

// auction/success/:user :Danh sách sản phẩm đấu giá thành công
router.get("/success/:userID",async function(req,res){
    var user,cates
    await Users.findOne({_id:res.locals.id}).then(u => user = u)
    await Cates.find({}).then(c => cates = c)
    res.render("home",{page:"success",user,cates});
})


module.exports = router