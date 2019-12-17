var express = require('express')
var router = express.Router()
var moment = require("moment")

const Users = require("../models/User")
const Cates = require("../models/cate")
const Product = require("../models/product")
//  /auction
// auction/:user :Danh sách sản phẩm đang đấu giá 
router.get("/:userID",async function(req,res){
    var id = req.params.userID
    if(res.locals.id !== id) return res.redirect("/auction/"+res.locals.id)

    var d = new Date();
    var n = moment(d).format('YYYY-MM-DD h:m:s')

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
    var n = moment(d).format('YYYY-MM-DD h:m:s')

    var [user,cates] = await Promise.all([
        Users.findOne({_id:res.locals.id}),
        Cates.find({})
    ])
    var products = await Product.find({
        _id      : {$in : sp_Dau_Gia },
        date_end : {$lt : n},
    })
    // Xóa các sản phẩm đấu giá không thành công trong danh sách
    if(products !== null){
        products.forEach(function(p,index){
            if(p.Bidder[p.Bidder.length - 1] !== user.username){
                products.splice(index,1)
            }
        })
    }    
    res.render("home",{page:"success",user,cates,products});
})

router.post("/:userID",async function(req,res){
    var id = req.params.userID
    if(res.locals.id !== id) return res.redirect("/auction/"+res.locals.id)

    var {product_id} = req.body
    await Users.findOneAndUpdate(
        {_id:id},
        {$push: {sp_Dau_Gia: product_id}},
        function(err){
            if(err) return res.send(err)
            else return res.send("Đã đấu giá sản phẩm !!!")
        })
})

module.exports = router