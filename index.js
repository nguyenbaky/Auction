var express = require("express");
var app = express();
app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static("public"));
app.listen(8000);

// body-parser
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// mongo
var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://nguyen:JrZm8cSs8bsWHv1Q@cluster0-f0jha.mongodb.net/auction?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology: true },function(err){
    if(err){
        console.log("Mongo connected error: "+err);
    }else{
        console.log("Connected succesful.");
    }
})

// model
const User = require("./models/User");
const Product = require("./models/product");
const Category = require("./models/category");



app.get("/",function(req,res){
   
    res.render("home",{page:"home"});
})

// login
app.get("/login",function(req,res){
    res.render("login");
})

app.post("/login",function(req,res){
    User.find({ho_ten:req.body.email},function(err){
        if(err){
            console.log("Wrong username");
        }
        else{
            console.log("1");
            res.redirect("/");
        }
    })
})

// sign up
app.get("/signup",function(req,res){
    console.log("get");
    res.render("signup");
})

app.post("/signup",function(req,res){
    console.log(req.body.email);
    User.findOne({email:req.body.email}).then(function(user){
        if(!user){       
           res.render("signup",{message:""});
        }
        else{
            console.log(user);
            res.render("signup",{message:"email used !!!"});
        }
    })

    // User.find({username:req.body.name},function(err,item){
    //     if(err){
    //         res.render("signup",{message:"Username already exists !!"});
    //     }else{
    //         console.log(u);
    //     }
    // })

    var u = User({
        username: req.body.name,
        email: req.body.email,
        password: req.body.password,
        dia_chi: req.body.address
    })

    
    // res.redirect("/");
})


// Category
app.get("/category",function(req,res){
    res.render("home",{page:"category"})
})