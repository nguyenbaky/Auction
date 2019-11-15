var express = require("express");
var app = express();
app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static("public"));
app.listen(8000,function(){
    console.log("Running on local host 8000 !!!");
});

// body-parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

///////////////////////////////////// mongo ///////////////////////////////////////
// var mongoose = require("mongoose");
// mongoose.connect("mongodb+srv://nguyen:JrZm8cSs8bsWHv1Q@cluster0-f0jha.mongodb.net/auction?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology: true },function(err){
//     if(err){
//         console.log("Mongo connected error: "+err);
//     }else{
//         console.log("Connected succesful.");
//     }
// })
//////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////// model ////////////////////////////////////////////////
// const User = require("./models/User");
// const Product = require("./models/product");
// const Category = require("./models/category");
// const cate = require("./models/cate");
// const admin = require("./models/admin");
//////////////////////////////////////////////////////////////////////////////////////////

// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// jwt 
var jwt = require('jsonwebtoken');
var secret = "seasda@$%#$%ad";

// session
var session = require("express-session");
app.set('trust proxy', 1) // trust first proxy
app.use(session({ secret: 'asdxc#$%&dfhd', cookie: { maxAge: 3600000 }}))

//////////////////////////////////////////////////////////////////////////////////////////
// function handleUserRedirect(req,res,next){
//     if(typeof req.session.token != "undefined"){
//         next();
//     }
//     else{
//         res.redirect("/login");
//     }    
// }
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
// function handleAdminRedirect(req,res,next){
//     if(typeof req.session.token_admin != "undefined"){
//         next();
//     }
//     else{
//         res.redirect("/login");
//     } 
// }
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
// function handleLevelUser(req,res,next){
//     jwt.verify(req.session.token,secret,function(err,decoded){
//         if(decoded.level > 1){
//             next();
//         }else{
//             res.redirect("/")
//         }
//     })
// }
//////////////////////////////////////////////////////////////////////////////////////////

// home
app.get("/",function(req,res){      
    res.render("home",{page:"home"});    
})

// Category
app.get("/category",function(req,res){
    res.render("home",{page:"category"});
})

// login
app.get("/login",function(req,res){
    res.render("login");
})

//////////////////////////////////////////////////////////////////////////////////////////
// app.post("/login",function(req,res){
//     var check_user = 1;
//     var check_admin = 1;
//     User.findOne({email:req.body.email}).then(function(user){
//         if(user){
//             // check user
//             bcrypt.compare(req.body.pass, user.password, function(err, res2) {
//                 if(res2 == true){
//                     jwt.sign(user.toJSON(),secret,{expiresIn:'1d'},function(err,token){
//                         if(err){
//                             console.log("Token generate erro: "+ err);
//                         }else{
//                             res.session.token = token;
//                         }
//                     });
//                     return res.redirect("/");
                   
//                 }else{
//                     return res.render("login",{message:"Wrong password !!!"});
//                 }
//             });
//         }
//         else{ // check admin
//             admin.findOne({email:req.body.email}).then(function(admin){
//                 if(admin){
//                     bcrypt.compare(req.body.pass, admin.password, function(err, res2) {
//                         if(res2 == true){
//                             jwt.sign(admin.toJSON(),secret,{expiresIn:'1d'},function(err,token){
//                                 if(err){
//                                     console.log("Token generate erro: "+ err);
//                                 }else{
//                                     req.session.token_admin = token;
//                                     req.session.save();
//                                 }
//                             });
//                             return res.redirect("/admin");
//                         }else{
//                             return res.render("login",{message:"Wrong password !!!"});
//                         }
//                     });
//                 }
//                 else{
//                     return res.render("login",{message:"Wrong email !!!"});
//                 }
//             })
//         }
//     })   
// })
//////////////////////////////////////////////////////////////////////////////////////////


// sign up
app.get("/signup",function(req,res){
    res.render("signup");
})

//////////////////////////////////////////////////////////////////////////////////////////
// app.post("/signup",function(req,res){
//     User.findOne({username:req.body.username}).then(function(user){
//         if(user){
//             return res.render("signup",{message:"Username already exists !!!"});
//         }else{
//             User.findOne({email:req.body.email}).then(function(user){
//                 if(user){   
//                     return res.render("signup",{message:"email used !!!"});
//                 }
//                 else{
//                     admin.findOne({email:req.body.email}).then(function(admin){
//                         if(admin){       
//                             return res.render("signup",{message:"email used !!!"});
//                         }
//                         else{
//                             bcrypt.hash(req.body.pass, saltRounds, function(err, hash) {
//                                 var u = new User({
//                                     ho_ten: req.body.name,
//                                     username: req.body.username,
//                                     email: req.body.email,
//                                     password: hash,
//                                     dia_chi: req.body.address,
//                                     diem: 0
//                                 })
//                                 u.save(function(err){
//                                     if(err){
//                                         console.log(err);
//                                     }
//                                     else{          
//                                         return res.redirect("/");
//                                     }
//                                 })
//                             });
//                         }
//                     })
//                 }
//             })
//         }
//     })
// })
//////////////////////////////////////////////////////////////////////////////////////////

// product
app.get("/add-product",function(req,res){
    res.render("home");
})

// admin
app.get("/admin",function(req,res){
    res.render("admin",{page:"Dashboard"});
})

app.get("/admin/cate",function(req,res){
    res.render("admin",{page:"Cate"});
})

app.get("/admin/cate/:category",function(req,res){
    res.render("admin",{page:"Category",category:req.params.category});
})