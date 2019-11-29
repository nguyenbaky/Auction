var express = require('express')
var router = express.Router()
const Cate = require("../models/cate");

router.get("/",function(req,res){           
    res.render("admin",{page:"Dashboard"});
})

router.get("/category",async function(req,res){
    let cate = await Cate.find({},function(err,cate){
        res.json(cate)
    })
    // res.render("admin",{page:"Category"});
})

router.get("/category/:category",function(req,res){
    res.render("admin",{page:"Category_2",category:req.params.category});
})

router.get("/users",function(req,res){
    res.render("admin",{page:"User"});
})

router.get("/request",function(req,res){
    res.render("admin",{page:"Request"});
})


module.exports = router