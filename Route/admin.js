var express = require('express')
var router = express.Router()
const Cate = require("../models/cate");
const User = require("../models/User")

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
//// add cateogory
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
//// update category
router.put("/category",async function (req,res) {
    var {name} = req.body;
    await Cate.findOne({name},function (err,cate) {
        if(cate){
            return res.send("Category đã tồn tại !!!");
        }
        else{
            Cate.findOneAndUpdate({_id:req.body.id},{name},function (err,c) {
                if(err){
                    return res.send(500, {error: err});
                }
                else{
                    return res.send("Sửa thành công")
                }
            })
        }
    })  
})
/// delete category
router.delete("/category",async function(req,res) {
    var {id} = req.body;
    await Cate.findOne({_id:id},function (err,cate) {
        if(cate.categoryID.toString() === ""){
            cate.delete(function (err,c) {
                if(!err){
                    return res.send("Xóa thành công");
                }             
            })
        }else{
            return res.send("Không thể xóa danh mục đã có thể loại ");
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
    let cate = await Cate.find({},function (err,cates) {
        let users = User.find({},function (err,users) {
            res.render("admin",{page:"User",cates,users});
        })
    })  
})
///// update level user
router.put("/users",async function(req,res){
    var {email,level} = req.body
    await User.findOneAndUpdate({email},{level,is_update:0},function(err,u){
        if(!err){
            return res.send("Sửa thành công !!!")
        }else{
            return res.send(err)
        }
    })

})

//// delete user
router.delete("/users",async function(req,res){
    var {email} = req.body
    await User.findOneAndDelete({email},function(err,u){
        if(err){
            return res.send(err)
        }else{
            return res.send("Xóa thành công")
        }
    })

})

router.get("/request",async function(req,res){
    let cate = await Cate.find({},async function(err,cates){
        res.render("admin",{page:"Request",cates});
    }) 
    
})


module.exports = router