var express = require('express')
var router = express.Router()
var moment = require("moment")

const Users = require("../models/User")
const Cates = require("../models/cate")
const Products = require("../models/product")
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
    var products = await Products.find({
        _id      : {$in : user.sp_Dau_Gia },
        date_end : {$gt : n}
    })
    var isEmpty = products.length === 0 ? 1 : 0
    res.render("home",{page:"product_auction",user,cates,products,isEmpty})
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
    var products = await Products.find({
        _id      : {$in : user.sp_Dau_Gia },
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
    var isEmpty = products.length === 0 ? 1 : 0
    
    res.render("home",{page:"success",user,cates,products,isEmpty});
})

// cap nhat dau gia 
router.post("/:userID",async function(req,res){
    var id = req.params.userID
    if(res.locals.id !== id) return res.redirect("/auction/"+res.locals.id)

    var {product_id} = req.body
    var user = await Users.findOne({_id:id})
    if(user.sp_Dau_Gia.indexOf(product_id) === -1){
        await Users.findOneAndUpdate(
            {_id:id},
            {$push: {sp_Dau_Gia: product_id}},
            function(err){
                if(err) return res.send(err)
                else return res.send("Đã đấu giá sản phẩm !!!")
            })
    }  else{
        return res.send("Đã đấu giá sản phẩm !!!")
    }
})

// cap nhat gia hien tai
router.put("/:productID",async function (req,res) {
    var id = req.params.productID
    var {Gia_Hien_Tai,bidder,thoi_diem} = req.body

    var product = await Products.findOne({_id:id})
    if(product.Gia_Hien_Tai + product.Buoc_gia > Gia_Hien_Tai){
        return res.send("Giá không hợp lệ !!!")
    }else{
        await Products.findOneAndUpdate(
            {_id:id},
            {
                Num_bid : product.Num_bid + 1, 
                Gia_Hien_Tai, 
                $push :  { Bid_price: Gia_Hien_Tai , Bidder: bidder , thoi_diem : thoi_diem} 
            })
            
        await Products.updateOne(
            {_id:id},
            {
                $pop : {Bid_price : 1, Bidder : 1, thoi_diem : 1}
            },
            function(err){
                if(err) return res.send(err)
                else return res.send("Đã đấu giá sản phẩm !!")
            })
    }    


})
module.exports = router