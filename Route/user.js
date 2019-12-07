var express = require('express')
var router = express.Router()
const Users = require("../models/User")
const Cates = require("../models/cate")

const bcrypt = require('bcrypt');
const saltRounds = 10;

//profile
router.get("/profile/:userID",async function(req,res){
    var user,cates
    await Users.findOne({_id:res.locals.id}).then(u => user = u)
    await Cates.find({}).then(c => cates = c)
    res.render("home",{page:"profile",user,cates});
})

router.post("/profile/:userID",async function(req,res) {
    var {username,ho_ten,email,dia_chi} = req.body
    var id =  req.params.userID
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

router.put("change_password/:userID",async function(req,res){
    var {oldpassword,password} = req.body
    bcrypt.hash(oldpassword,saltRounds,function(err,hash) {
        oldpassword = hash
    })
    bcrypt.hash(password,saltRounds,function(err,hash){
        password = hash
    })
    var id = req.params.userID
    await Users.findOneAndUpdate({_id:id,password:oldpassword},{password},function(err,user){
        if(err) return res.send(err)
        else return res.send("Đổi password thành công")
    })
})

// /favorite/:user
router.get("/favorite/:userID",async function(req,res){
    var user,cates
    await Users.findOne({_id:res.locals.id}).then(u => user = u)
    await Cates.find({}).then(c => cates = c)
    res.render("home",{page:"favorite",user,cates});
})
// update level
router.put("/request/:userID",async function(req,res) {
    var {userID} = req.params
    await Users.findOneAndUpdate({_id:userID},{is_update:1} ,function(err,u){
        if(!err) {
            return res.send("Thành công")
        }
        else return res.send("Thất bại")
    })
})


module.exports = router