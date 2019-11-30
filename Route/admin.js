var express = require('express')
var router = express.Router()
const Cate = require("../models/cate");



router.get("/",async function(req,res){   
    let cate = await Cate.find({},function(err,cates){
        res.render("admin",{page:"Dashboard",cates});
    })         
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
    await Cate.findOne({name},function (err,cate) {
        if(cate){
            console.log(cate);
            return res.send("Category đã tồn tại !!!");
        }
        else{
            c.save(function(err,c){
                if(err){
                    return res.send("Không thành công");
                }
                else{
                    return res.send("Thêm thành công");  
                }
            })
        }
    })    
})

router.put("/category",async function (req,res) {
    console.log(req.body.id);
    var {name} = req.body;
    await Cate.findOneAndUpdate({_id:req.body.id},{name},function (err,c) {
        if(err){
            return res.send(500, {error: err});
        }
        else{
            return res.send("Sửa thành công")
        }
    })
    
})

router.get("/category/:category",async function(req,res){
    let cate = await Cate.findOne( {name: req.params.category}, function(err,cate){
        

        res.send(cate);
    })

    // await Cate.find({},function(err,cates){


    //     res.render("admin",{page:"Category_2",category:req.params.category,cates});
    // })   
})

router.get("/users",async function(req,res){
    let cate = await Cate.find({},async function(err,cates){
        res.render("admin",{page:"User",cates});
    }) 
})

router.get("/request",async function(req,res){
    let cate = await Cate.find({},async function(err,cates){
        res.render("admin",{page:"Request",cates});
    }) 
    
})


module.exports = router