var express = require('express')
var router = express.Router()
const Users = require("../models/User")
const Cates = require("../models/cate")

router.get("/",async function(req,res){ 
    var {level} = res.locals;
    var user,cates
    await Cates.find({}).then(c => cates = c)
    if(level === 0){     // Guest
        res.render("home",{page:"home",cates})
    }
    else{
        await Users.findOne({_id:res.locals.id}).then(u => user = u)
        res.render("home",{page:"home",user,cates})
    }
})

// view category
router.get("/category/:categoryID/:p",async function(req,res){
    var {level} = res.locals;
    var user,cates,cate
    var {p} = req.params

    await Cates.find({}).then(c => cates = c)
    await Cates.find({_id:req.params.categoryID}).sort({date_begin:-1}).then(c => cate = c)
    if(level === 0){
        res.render("home",{page:"category",cates,cate,p});
    }
    else{
        await Users.findOne({_id:res.locals.id}).then(u => user = u)
        res.render("home",{page:"category",user,cates,cate,p});
    }  
})

// /chi-tiet-san-pham/:id_product
router.get("/chi-tiet-san-pham",async function(req,res){
    var {level} = res.locals;
    var user,cates
    await Cates.find({}).then(c => cates = c)
    if(level === 0){
        res.render("home",{page:"product_detail"});
    }else{
        
        await Users.findOne({_id:res.locals.id}).then(u => user = u)        
        res.render("home",{page:"product_detail",user,cates});
    }  
})

module.exports = router