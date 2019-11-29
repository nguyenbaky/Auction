var express = require('express')
var router = express.Router()

//profile
router.get("/profile/:userID",function(req,res){
    res.render("home",{page:"profile",user:true,_id:res.locals.userID});
})

//// /favorite/:user
router.get("/favorite/:userID",function(req,res){
    res.render("home",{page:"favorite",user:true,_id:res.locals.userID});
})

module.exports = router