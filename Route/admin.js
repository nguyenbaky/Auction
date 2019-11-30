var express = require('express')
var router = express.Router()
const Cate = require("../models/cate");

router.get("/",function(req,res){           
    res.render("admin",{page:"Dashboard"});
})

router.get("/category",async function(req,res){
    let cate = await Cate.find({},function(err,cates){
        res.render("admin",{page:"Category",cates});
    })    
})

router.post("/category",async function(req,res){
    var {name} = req.body;
    var c = new Cate({
        name
    })
    c.save(function(err,c){
        if(err){
            res.render("admin",{page:"Category",cates,err});
        }
        else{
            console.log("insert success");
        }
    })

    let cate = await Cate.find({},function(err,cates){
        console.log("aa");
        res.send("Thêm thành công");
    })    
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