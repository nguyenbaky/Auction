var express = require('express')
var router = express.Router()

const Users = require("../models/User")
const Cates = require("../models/cate")
const Products = require("../models/product")
const Categories = require("../models/category")

router.get("/",async function(req,res){ 
    var d = new Date();
    var n = moment(d).format('YYYY-MM-DD h:m:s')

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

router.get("/category/:cateID",async function(req,res){
    var {level} = res.locals;

    var [cates,cate]= await Promise.all([
        Cates.find({}),
        Cates.findOne({_id:req.params.cateID})
    ])

    var categories = await Categories.find({_id: {$in : cate.categoryID}})

    if(level === 0){
        res.render("home",{page:"cate",cates,cate,categories})
    }else{
        var user = await Users.findOne({_id:res.locals.id})
        res.render("home",{page:"cate",cates,cate,categories,user})
    }
    
})

// view category
router.get("/category/:cateID/:categoryID",async function(req,res){
    var {level} = res.locals;  

    var d = new Date();
    var n = moment(d).format('YYYY-MM-DD h:m:s')

    var [cates,category]= await Promise.all([
        Cates.find({}),
        Categories.findOne({_id:req.params.categoryID})
    ]) 

    var products = await Products.find({
        _id      : {$in: category.productID},
        date_end : {$gt:n}
    })

    if(level === 0){
        res.render("home",{page:"category",cates,products,category});
    }
    else{
        var user = await Users.findOne({_id:res.locals.id})
        res.render("home",{page:"category",user,cates,products,category});
    }  
})

// /chi-tiet-san-pham/:id_product
router.get("/chi-tiet-san-pham/:productID",async function(req,res){
    var {level} = res.locals;

    var [cates,p] = await Promise.all([
        Cates.find({}),
        Products.findOne({_id:req.params.productID})
    ])
    
    if(level === 0){
        res.render("home",{page:"product_detail",cates,p});
    }else{      
        var user = await Users.findOne({_id:res.locals.id})       
        res.render("home",{page:"product_detail",user,cates,p});
    }  
})


module.exports = router