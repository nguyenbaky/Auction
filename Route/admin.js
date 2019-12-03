var express = require('express')
var router = express.Router()

const Cate = require("../models/cate");
const Category = require("../models/category")
const User = require("../models/User")
const Products = require("../models/product");


router.get("/",async function(req,res){   
    let cate = await Cate.find({},function(err,cates){
        res.render("admin",{page:"Dashboard",cates});
    })         
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

// category 1
router.get("/category",async function(req,res){
    let cate = await Cate.find({},function(err,cates){
        res.render("admin",{page:"Category",cates});
    })    
})
//// add cateogory 1
router.post("/cate",async function(req,res){
    var {name} = req.body;
    var c = new Cate({
        name,
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
//// update category 1
router.put("/cate",async function (req,res) {
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
/// delete category 1
router.delete("/cate",async function(req,res) {
    var {id} = req.body;
    await Cate.findOne({_id:id},function (err,cate) {
        if(cate.categoryID.toString() === ""){
            cate.delete(function (err,c) {
                if(!err){
                    return res.send("Xóa thành công");
                }             
            })
        }else{
            return res.send("Không thể xóa danh mục đã có thể loại");
        }
    })
   
})

/// category 2
router.get("/category/:cate_id",async function(req,res){
    var {cate_id} = req.params // id cate
    await Cate.findOne({_id:cate_id},function(err,cate){
        if(cate){
            var name = cate.name
            Category.find({
                _id: { $in: cate.categoryID }
            },function(err,categories){
                Cate.find({},function(err,cates){
                    res.render("admin",{page:"Category_2",name,cates,categories,cate});
                })
            })
        }
        else{
            res.status(500).send('Something wrong!')
        }
    })   
})

router.post("/category/:cate_id",async function(req,res){
    var {name} = req.body
    var c = new Category({
        name
    })
    await Category.findOne({name},function (err,category) {
        if(category){
            return res.send("Category đã tồn tại !!!");
        }
        else{
            c.save(function(err,c){
                if(err){
                    return res.send("Không thành công");
                }
                else{
                    var id = req.params.cate_id
                    Cate.findOneAndUpdate(
                        {_id:id},
                        { $push:{categoryID:c._id} },
                        function(err,cate){
                            if(!err) console.log("thêm id thanh cong")
                        })
                    return res.send("Thêm thành công");  
                }
            })
        }
    })   
})

router.put("/category/:cate_id",async function(req,res){
    var {name} = req.body;
    await Category.findOne({name},function (err,category) {
        if(category){
            return res.send("Category đã tồn tại !!!");
        }
        else{
            Category.findOneAndUpdate({_id:req.body.id},{name},function (err,c) {
                if(err){
                    return res.send(err)
                }
                else{
                    return res.send("Sửa thành công")
                }
            })
        }
    })  
})

router.delete("/category/:cate_id",async function(req,res){
    var {id} = req.body;
    var {cate_id} = req.params
    await Category.findOne({_id:id},function (err,category) {
        if(category.productID.toString() === ""){
            category.delete(function (err,cate) {
                if(!err){
                    Cate.findOneAndUpdate(
                        {_id:cate_id},
                        {$pull: {categoryID: id}},
                        function(err,c){
                            if(!err) console.log("xóa id thành công")
                        }
                    )
                    return res.send("Xóa thành công");
                }             
            })
        }else{
            return res.send("Không thể xóa thể loại đã có sản phẩm");
        }
    })
})

/// product
router.get("/product/:category_id",async function(req,res){
    var date = new Date()
    var {category_id} = req.params  // id category
    await Category.findOne({_id:category_id},function(err,category){
        if(category){
            var name = category.name
            Products.find({
                _id: {$in : category.productID},
            },function(err,products){
                Cate.find({},function(err,cates){
                    return res.render("admin",{page:"Product",products,cates,name})
                })
            })

        }else{
            res.status(500).send('Something wrong!')
        }
    })
    

   
})

router.delete("/product/:category_id",async function(req,res){
    var {category_id} = req.params
    var {id} = req.body
    await Category.findOneAndUpdate(
            {_id: category_id},
            { $pull: {productID: id}},
            function(err,p){
                if(!err) console.log("Xoa id product khoi category thành công")
            }
        )
    await Products.findOneAndDelete({_id:id},function(err,p){
        if(!err) return res.send("Xóa thành công")
        else return res.send(err)
    })
})
module.exports = router