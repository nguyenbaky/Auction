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

var mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb+srv://nguyen:JrZm8cSs8bsWHv1Q@cluster0-f0jha.mongodb.net/auction?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology: true },function(err){
    if(err){
        console.log("Mongo connected error: "+err);
    }else{
        console.log("Connected succesful.");
    }
})

// Router
var admins = require('./Route/admin')
var products = require('./Route/product')
var home = require('./Route/home')
var auction = require('./Route/auction')
var users = require('./Route/user')

//multer
var multer  = require('multer');
const Cate = require("./models/cate");
const User = require("./models/User");
const Product = require("./models/product");
const cate = require("./models/cate");
const admin = require("./models/admin");
const Category = require("./models/category")

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

function handleUserRedirect(req,res,next){
    if(typeof req.session.token != "undefined"){
        next();
    }
    else{
        res.redirect("/login");
    }    
}

function handleAdminRedirect(req,res,next){
    if(typeof req.session.token_admin != "undefined"){
        next();
    }
    else{
        res.redirect("/login");
    } 
}

function handleLevelUser(req,res,next){
    jwt.verify(req.session.token,secret,function(err,decoded){
        if(decoded.level > 1){
            next();
        }else{
            res.redirect("/")
        }
    })
}

function passIdUser(req,res,next){
    jwt.verify(req.session.token,secret,function(err,decoded){
        res.locals.userID = decoded._id
        next();
    })
}

function checkLvUser(req,res,next){
    if(typeof req.session.token === "undefined"){
        res.locals.level = 0;
    }
    else{
        jwt.verify(req.session.token,secret,function(err,decoded){
            res.locals.level = decoded.level;
            res.locals._id = decoded._id;
        })
    }    
    next();
}

app.get("/",function(req,res){ 
    if(typeof req.session.token != "undefined"){     
        jwt.verify(req.session.token,secret,function(err,decoded){
            if(decoded.level > 1){
                // Seller
                res.render("home",{page:"home",user:true,seller:true,_id:decoded._id})
            }else{
                // Bidder
                res.render("home",{page:"home",user:true,_id:decoded._id})
            }
        })  
    }
    else{
        // Guest 
        res.render("home",{page:"home"})
    }

    // var c = new Category({
    //     name : "Java for beginer"
    // })
    // c.save(function(err,c){
    //     if(err){res.json(err)}
    //     else res.json("success")
    // })
})

// login
app.get("/login",function(req,res){
    res.render("login");
})

app.post("/login",function(req,res){
    User.findOne({email:req.body.email}).then(function(user){
        if(user){
            // check user
            bcrypt.compare(req.body.pass, user.password, function(err, res2) {
                if(res2 == true){
                    jwt.sign(user.toJSON(),secret,{expiresIn:'1d'},function(err,token){
                        if(err){
                            console.log("Token generate erro: "+ err);
                        }else{                            
                            req.session.token = token;
                            req.session.save();
                            console.log("Token trong login:"+res.session.token);
                        }
                    });
                    return res.redirect("/");
                   
                }else{
                    return res.render("login",{message:"Wrong password !!!"});
                }
            });
        }
        else{ // check admin
            admin.findOne({email:req.body.email}).then(function(admin){
                if(admin){
                    bcrypt.compare(req.body.pass, admin.password, function(err, res2) {
                        if(res2 == true){
                            jwt.sign(admin.toJSON(),secret,{expiresIn:'1d'},function(err,token){
                                if(err){
                                    console.log("Token generate erro: "+ err);
                                }else{
                                    req.session.token_admin = token;
                                    req.session.save();   
                                }
                            return res.redirect("/admin");
                            });
                        }else{
                            return res.render("login",{message:"Wrong password !!!"});
                        }
                    });
                }
                else{                    
                    return res.render("login",{message:"Wrong email !!!"});
                }
            })
        }
    })   
})

// sign up
app.get("/signup",function(req,res){
    res.render("signup");
})

app.post("/signup",function(req,res){
    User.findOne({username:req.body.username}).then(function(user){
        if(user){
            return res.render("signup",{message:"Username already exists !!!"});
        }else{
            User.findOne({email:req.body.email}).then(function(user){
                if(user){   
                    return res.render("signup",{message:"email used !!!"});
                }
                else{
                    admin.findOne({email:req.body.email}).then(function(admin){
                        if(admin){       
                            return res.render("signup",{message:"email used !!!"});
                        }
                        else{
                            bcrypt.hash(req.body.pass, saltRounds, function(err, hash) {
                                var u = new User({
                                    ho_ten: req.body.name,
                                    username: req.body.username,
                                    email: req.body.email,
                                    password: hash,
                                    dia_chi: req.body.address,
                                    diem: 0,
                                    level: 1,
                                    is_update: 0 
                                })
                                u.save(function(err){
                                    if(err){
                                        console.log(err);
                                    }
                                    else{          
                                        return res.redirect("/");
                                    }
                                })
                            });
                        }
                    })
                }
            })
        }
    })
})

// logout 
app.get("/logout",function(req,res){
    req.session.destroy()
    res.redirect("/")
})

// home route (Guest view)
app.use('/',checkLvUser,home)

// auction route (User view)
app.use('/auction',handleUserRedirect,passIdUser,auction)

// admin
app.use("/admin",handleAdminRedirect,admins)

// User view 
app.use('/',handleUserRedirect,passIdUser,users)

// product route (seller view)
app.use('/product',handleUserRedirect,handleLevelUser,passIdUser,products)





