var express = require("express");
var app = express();
app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static("public"));
app.listen(8000,function(){
    console.log("Running on local host 8000 !!!");
});

// mail 
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tq237006@gmail.com',
      pass: 'qtran0987654321'
    }
  });


// body-parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
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
const Cates = require("./models/cate");
const Users = require("./models/User");
const Products = require("./models/product");
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

function getUser(req,res,next){
    if(typeof req.session.token === "undefined"){
        res.locals.level = 0;
    }
    else{
        jwt.verify(req.session.token,secret,function(err,decoded){
            res.locals.id = decoded._id
        })
    }    
    next();
}


// login
app.get("/login",function(req,res){
    res.render("login",{page:"login"});
})

app.post("/login",function(req,res){
    Users.findOne({email:req.body.email}).then(function(user){
        if(user){
            // check user
            bcrypt.compare(req.body.pass, user.password, function(err, res2) {
                if(res2 == true){
                    res.locals.user = user
                    jwt.sign(user.toJSON(),secret,{expiresIn:'1d'},function(err,token){
                        if(err){
                            console.log("Token generate error: "+ err);
                        }else{                            
                            req.session.token = token;
                            req.session.save();
                            console.log("Token trong login:"+res.session.token);
                        }
                    });
                    return res.redirect("/");
                   
                }else{
                    return res.render("login",{page:"login",message:"Wrong password !!!"});
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
                            return res.render("login",{page:"login",message:"Wrong password !!!"});
                        }
                    });
                }
                else{                    
                    return res.render("login",{page:"login",message:"Wrong email !!!"});
                }
            })
        }
    })   
})

// sign up
app.get("/signup",function(req,res){
    res.render("login",{page:"signup"});
})

app.post("/signup",function(req,res){
    Users.findOne({username:req.body.username}).then(function(user){
        if(user){
            return res.render("signup",{page:"signup",message:"Username already exists !!!"});
        }else{
            Users.findOne({email:req.body.email}).then(function(user){
                if(user){   
                    return res.render("login",{page:"signup",message:"email used !!!"});
                }
                else{
                    admin.findOne({email:req.body.email}).then(function(admin){
                        if(admin){       
                            return res.render("signup",{page:"signup",message:"email used !!!"});
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

app.get("/forgot",function(req,res){
    res.render("login",{page:"forgot"})
})

app.post("/forgot",async(req,res)=>{
    var {email} = req.body
    var user = await Users.findOne({email}).catch(err => {
        return res.render("login",{page:"forgot_password",message:"Email not found"})
    })
    jwt.sign(user.toJSON(),secret,{expiresIn:'5m'},function(err,token){
        if(err){
            console.log("Token generate error: "+ err);
        }else{                            
            var mailOptions = {
                from: 'tq237006@gmail.com',
                to: email,
                subject: 'Reset password',
                text: 'Reset password link: http://localhost:8000/reset_password/'+token
                };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.send("Check your email to reset password")
                }
                });   
        }
    });
 
    
})

app.get("/reset_password/:token",(req,res)=>{
    jwt.verify(req.params.token,secret,function(err,decoded){
        res.render("login",{page:"reset_password",user:decoded})
    })
})

app.post("/reset_password/:id",(req,res)=>{
    var {_id,password} = req.body;
    console.log(_id)
    console.log(password)

    bcrypt.hash(password,saltRounds,async function (err,hash) {
        if(!err){
            await Users.findOneAndUpdate({_id},{password:hash},function (err,u) {
                if(err) return res.send("Something went wrong !!!")
                else return res.send("Đổi password mới thành công !!!")         
            })
        }else{
            return res.send("Something went wrong !!!")
        }
    })
})

// logout 
app.get("/logout",function(req,res){
    req.session.destroy()
    res.redirect("/")
})



// home route (Guest view)
app.use('/',getUser,home)

// auction route (User view)
app.use('/auction',handleUserRedirect,getUser,auction)

// admin
app.use("/admin",handleAdminRedirect,admins)

// User view 
app.use('/',handleUserRedirect,getUser,users)

// product route (seller view)
app.use('/product',handleUserRedirect,handleLevelUser,getUser,products)





