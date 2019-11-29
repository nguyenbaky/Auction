var express = require('express')
var router = express.Router()

// view category
router.get("/category",function(req,res){
    var lv = res.locals.level;
    if(lv === 0){
        res.render("home",{page:"category"});
    }
    else if(lv === 1){
        res.render("home",{page:"category",user:true,_id:res.locals._id});
    }
    else{
        res.render("home",{page:"category",user:true,seller:true,_id:res.locals._id});
    }    
})

// /chi-tiet-san-pham/:id_product
router.get("/chi-tiet-san-pham",function(req,res){
    var lv = res.locals.level;
    console.log("level: "+lv);
    if(lv === 0){
        console.log("0");
        res.render("home",{page:"product_detail"});
    }
    else if(lv === 1){
        console.log("01");
        res.render("home",{page:"product_detail",user:true,_id:res.locals._id});
    }
    else{
        console.log("2");
        res.render("home",{page:"product_detail",user:true,seller:true,_id:res.locals._id});
    }  
})

module.exports = router