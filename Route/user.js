var express = require('express')
var router = express.Router()
const Users = require("../models/User")
const Cates = require("../models/cate")

//profile
router.get("/profile/:userID",async function(req,res){
    var user,cates
    await Users.findOne({_id:res.locals.id}).then(u => user = u)
    await Cates.find({}).then(c => cates = c)
    res.render("home",{page:"profile",user,cates});
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