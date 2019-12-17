var express = require('express')
var router = express.Router()
var moment = require("moment")

const Users = require("../models/User")
const Cates = require("../models/cate")
const Products = require("../models/product")
const Categorys = require("../models/category")

const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + "-" + file.originalname)
    }
}); 

const upload = multer({
    storage: storage,
    fileFilter: function (req,file,cb) {
        console.log(file)
        if(file.mimetype === "image/bmp" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/gif"){
                cb(null,true)
            }else{
                return cb(new Error("Only images are allowed!"));                
            }
    }
 }).array('input2[]',5);

// Hiện thông tin sản phẩm đang bán
router.get("/:sellerID",async function(req,res){
    var id = req.params.sellerID
    if(res.locals.id !== id) return res.redirect("/product/"+res.locals.id) 

    var d = new Date();
    var n = moment(d).format('YYYY-MM-DD h:m:s')
    
    var [user,cates] = await Promise.all([
        Users.findOne({_id:res.locals.id}),
        Cates.find({})    
    ])  
    var products = await Products.find({
        Seller    : user.username,
        date_end  : {$gt:n}
    })
    res.render("home",{page:"product",user,cates,products});
})

// Hiện thông tin sản phẩm đã bán
router.get("/sold/:sellerID",async function(req,res){
    var id = req.params.sellerID
    if(res.locals.id !== id) return res.redirect("/product/sold/"+res.locals.id)    

    var d = new Date();
    var n = moment(d).format('YYYY-MM-DD h:m:s')

    var [user,cates] = await Promise.all([
        Users.findOne({_id:res.locals.id}),
        Cates.find({}), 
    ])
    
    var products = await Products.find({
        Seller      : user.username,
        date_end    : {$lt:n}
    })

    res.render("home",{page:"sold_product",user,cates,products});
})

// Thêm sản phẩm đang bán
router.get("/add/:sellerID",async function(req,res){
    var id = req.params.sellerID
    if(res.locals.id !== id) return res.redirect("/product/add/"+res.locals.id) 
    
    var [user,cates] = await Promise.all([
        Users.findOne({_id:res.locals.id}),
        Cates.find({}),
    ])        
    res.render("pages/add_product",{page:"add_product",user,cates});
})

router.post("/add/:sellerID",async function(req,res){    
    upload(req,res,function (err) {
        if(err instanceof multer.MulterError){
            console.log("A multer error occoured when uploading.")
            return res.status(500).send(err)
        }else if(err){
            console.log("An unknown error occoured when uploading: "+ err)
            return res.status(500).send(err)
        }else{
            console.log(req.body.content)
            var d = req.body.date_end
            var h = req.body.hour
            var m = req.body.min
            d = moment(d,'DD/MM/YYYY').format('YYYY-MM-DD')
            var date_end = d+" "+h+":"+m+":0"
            var date_begin = new Date()
            date_begin = moment(date_begin,'DD/MM/YYYY').format('YYYY-MM-DD h:m:s')

            var p = new Products({
                name           : req.body.name,
                Gia_Khoi_Diem  : req.body.Gia_Khoi_Diem,
                Buoc_gia       : req.body.Buoc_gia,
                description    : req.body.content,
                Seller         : req.body.seller,
                date_begin     : date_begin,
                date_end       : date_end,
                categoryID     : req.body.selectCate,
                Gia_Hien_Tai   : req.body.Gia_Khoi_Diem,
                Num_bid        : 0
            })
            
            console.log("before save")
            p.save(function(err){
                if(err) console.log(err)
            })

            console.log("saved")
            // Thêm sp vào cate
            Categorys.findOneAndUpdate(
                {_id:req.body.selectCate},
                {$push : {productID: p._id}},
                function(err){
                    if(err){
                        console.log(err)
                    }
                }
                )
                console.log("added")
            // Lưu URL Images
            for(i = 0; i < req.files.length;i++){
                console.log("in for")
                Products.findOneAndUpdate(
                    {_id:p._id},
                    {$push : {images:req.files[i].filename}},
                    function(err){
                        if(err){
                            console.log(err)
                        }else{
                            console.log("them thanh cong ")
                        }
                    }
                    )
            }
            return res.redirect("/product/"+req.params.sellerID)
        }        
    })


})

// cap nhat gia hien tai
router.put("/:productID",async function (req,res) {
    var id = req.params.productID
    var {Gia_Hien_Tai,bidder,thoi_diem} = req.body
    await Products.findOneAndUpdate(
        {_id:id},
        {Num_bid: Num_bid+1, Gia_Hien_Tai, 
        $push:{Bid_price: Gia_Hien_Tai,Bidder: bidder, thoi_diem:thoi_diem}},
        function(err){
            if(err) return res.send(err)
            else return res.send("Đấu giá thành công !!")
        })
})

module.exports = router