var express = require('express')
var router = express.Router()

const Users = require("../models/User")
const Cates = require("../models/cate")
const Comments = require("../models/Comment")

const bcrypt = require('bcrypt');
const saltRounds = 10;

//profile
router.get("/profile/:userID",async function(req,res){
    var id = req.params.userID
    console.log(res.locals.id)
    if(res.locals.id !== id) return res.redirect("/profile/"+res.locals.id)
    var [user,cates] = await Promise.all([
        Users.findOne({_id:res.locals.id}),
        Cates.find({})
    ])
    var comments = await Comments.find({name:user.username})
    res.render("home",{page:"profile",user,cates,comments});
})

router.post("/profile/:userID",async function(req,res) {
    var id = req.params.userID
    if(res.locals.id !== id) return res.redirect("/profile/"+res.locals.id)
    var {username,ho_ten,email,dia_chi} = req.body    
    await Users.findOne({_id:id},function (err,user) {
        if(err) return res.send(err)
        else {
            Users.findOne({username},function (err,user) {
                if(user) return res.send("Username đã tồn tại")
                else {
                    Users.findOne({email},function (err,u) {
                        if(u) return res.send("Email đã tồn tại")
                        else {
                            Users.findOneAndUpdate({_id:id},
                                {username,ho_ten,email,dia_chi},
                                function(err,u){
                                    if(err) return res.send(err)
                                    else return res.send("Update thành công")
                            })
                        }
                    })
                }                
            })
        }        
    })
})

router.put("/change_password/:userID",async function(req,res){
    var id = req.params.userID
    if(res.locals.id !== id) return res.redirect("/change_password/"+res.locals.id)

    var {oldpassword,password} = req.body
    bcrypt.hash(oldpassword,saltRounds,function(err,hash) {
        oldpassword = hash
    })
    bcrypt.hash(password,saltRounds,function(err,hash){
        password = hash
    })

    await Users.findOneAndUpdate({_id:id,password:oldpassword},{password},function(err,user){
        if(err) return res.send(err)
        else return res.send("Đổi password thành công")
    })
})

// /favorite/:user
router.get("/favorite/:userID",async function(req,res){
    var id = req.params.userID
    if(res.locals.id !== id) return res.redirect("/favorite/"+res.locals.id)
    var [user,cates] = await Promise.all([
        Users.findOne({_id:res.locals.id}),
        Cates.find({})
    ])
    res.render("home",{page:"favorite",user,cates});
})

router.put("/favorite/:userID",async function(req,res){
    var _id = req.params.userID
    var {product_id} = req.body
    var user = await Users.findOne({_id})
    if(user.sp_Yeu_Thich.indexOf(product_id) !== -1) return res.send("sp đã yêu thích")
    else{
        await Users.findOneAndUpdate({
            _id,
            $push: {sp_Yeu_Thich: product_id},
            function(err){
                if(err) return res.send(err)
                else return res.send("Đã thêm vào yêu thích !!")
            }
        })
    }
    
})

// update level
router.put("/request/:userID",async function(req,res) {
    var id = req.params.userID
    if(res.locals.id !== id) return res.redirect("/request/"+res.locals.id)
    var {userID} = req.params
    await Users.findOneAndUpdate({_id:userID},{is_update:1} ,function(err,u){
        if(!err) {
            return res.send("Thành công")
        }
        else return res.send("Thất bại")
    })
})

//comment
router.post("/comment",async function (req,res) {
    var {name,sender,comment,point} = req.body
    var cmt = new Comments({
        name,sender,comment,point
    })

    cmt.save(function(err){
        if(err) return res.send(err)
        else return res.send("comment thành công !!!")
    })
})

module.exports = router