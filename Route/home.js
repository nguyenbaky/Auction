var express = require('express')
var router = express.Router()
const Users = require("../models/User")
const Cates = require("../models/cate")
const Products = require("../models/product")

router.get("/",async function(req,res){ 
    var day = new Date();
    var y =day.getFullYear()
    var m = day.getMonth() + 1
    var d = day.getDate() 
    var n = y+"-"+m+"-"+d
    var {level} = res.locals;
    var [cates,P_Highest,P_Old,P_Hot] = await Promise.all([
        Cates.find({}),
        Products.find({date_end:{$gt:n}}).sort({Gia_Hien_Tai:-1}).limit(4),
        Products.find({date_end:{$gt:n}}).sort({date_end:-1}).limit(4),
        Products.find({date_end:{$gt:n}}).sort({Num_bid:-1}).limit(4)
    ])
    if(level === 0){     // Guest
        res.render("home",{page:"home",cates,P_Highest,P_Old,P_Hot})
    }
    else{
        var user = await Users.findOne({_id:res.locals.id})
        res.render("home",{page:"home",user,cates,P_Highest,P_Old,P_Hot})
    }
})

// view category
router.get("/category/:categoryID/:p",async function(req,res){
    var {level} = res.locals;
    var {p} = req.params
    var [cates,cate]= await Promise.all([
        Cates.find({}),
        Cates.find({_id:req.params.categoryID}).sort({date_begin:-1})
    ]) 
    if(level === 0){
        res.render("home",{page:"category",cates,cate,p});
    }
    else{
        var user = await Users.findOne({_id:res.locals.id})
        res.render("home",{page:"category",user,cates,cate,p});
    }  
})

// /chi-tiet-san-pham/:id_product
router.get("/chi-tiet-san-pham/:productID",async function(req,res){
    var {level} = res.locals;
    var [cates,p] = await Promise.all([
        Cates.find({}),
        Products.findOne({_id:req.params.productID})
    ])
    console.log(p)
    console.log(p.thoi_diem.length)
    if(level === 0){
        res.render("home",{page:"product_detail",cates,p});
    }else{      
        var user = await Users.findOne({_id:res.locals.id})       
        res.render("home",{page:"product_detail",user,cates,p});
    }  
})


module.exports = router