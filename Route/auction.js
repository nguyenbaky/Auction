var express = require('express')
var router = express.Router()

//  /auction
// auction/:user :Danh sách sản phẩm đang giá thành công
router.get("/:userID",function(req,res){
    res.render("home",{page:"product_auction",user:true,_id:res.locals.userID})
})

// auction/success/:user :Danh sách sản phẩm đấu giá thành công
router.get("/success/:userID",function(req,res){
    res.render("home",{page:"success",user:true,_id:res.locals.userID});
})


module.exports = router