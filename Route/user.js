var express = require('express')
var router = express.Router()

//profile
router.get("/:userID/profile",function(req,res){
    res.render("home",{page:"profile",user:true});
})

//// /favorite/:user
router.get("/:userID/favorite",function(req,res){
    res.render("home",{page:"favorite",user:true});
})

module.exports = router