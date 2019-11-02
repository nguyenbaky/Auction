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
const cate = require("./models/cate");

// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.get("/",function(req,res){      
    var p = new Product({
        name:"Iphone X",
        image:"String",
        price: 5000000,
        date_begin: 2018-2-11,
        date_end: 2019-2-11,
        info: "",
        description: "Sản phẩm tốt",
    })
    p.save(function(err){
        if(err){
            console.log(err);
        }
    })

    res.render("home",{page:"home"});
})

// login
app.get("/login",function(req,res){
    res.render("login");
})

app.post("/login",function(req,res){
    User.findOne({email:req.body.email}).then(function(user){
        if(!user){
            return res.render("login",{message:"Wrong email !!!"})
        }
        else{
            bcrypt.compare(req.body.pass, user.password, function(err, res) {
                if(res == true){
                    return res.redirect("/");
                }else{
                    return res.render("login",{message:"Wrong password !!!"})
                }
            });
        }
    })
})

// sign up
app.get("/signup",function(req,res){
    res.render("signup");
})

app.post("/signup",function(req,res){
    console.log(req.body.username);
    console.log(req.body.pass);
    User.findOne({username:req.body.username}).then(function(user){
        if(user){
            return res.render("signup",{message:"Username already exists !!!"});
        }
    })

    User.findOne({email:req.body.email}).then(function(user){
        if(user){       
            return res.render("signup",{message:"email used !!!"});
        }
        
    })

    bcrypt.hash(req.body.pass, saltRounds, function(err, hash) {
        var u = new User({
            ho_ten: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hash,
            dia_chi: req.body.address,
            diem: 0
        })
        u.save(function(err){
            if(err){
                console.log(err);
            }
            else{      
                console.log("else");      
                return res.redirect("/");
            }
        })
    });

    
    
})


// Category
app.get("/category",function(req,res){
    res.render("home",{page:"category"});
})


app.get("/admin",function(req,res){
    res.render("admin",{page:"Dashboard"});
})