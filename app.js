require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


userSchema.plugin(encrypt, {secret: process.env.SECRET, excludeFromEncryption: ['email']});


const User = mongoose.model("User", userSchema);

app.get("/", function(req, res){
    res.render("home")
});

app.get("/login", function(req, res){
    res.render("login")
});

app.get("/register", function(req, res){
    res.render("register")
});

app.post("/register", function(req, res){
    const email = req.body.username;
    const passWord = req.body.password;

    const newUser = new User({
        email: email,
        password: passWord
    }) 
    if(email !== "" && passWord !== ""){
        newUser.save(function(err){
            if(!err){
                console.log("successfully saved")
            }
        })
        res.render("secrets")
    }else{
        res.send("unsuccesfully!")
    }
    

    

});

app.post("/login", function(req, res){
    const eMail = req.body.username;
    const passWord = req.body.password;

    User.findOne({email: eMail}, function(err, foundItem){
        if(!err){
            if(foundItem){
                if(foundItem.password === passWord){
                    res.render("secrets")
                }else{
                    res.redirect("/")
                }
            }    
        }
    })

})












app.listen(3000, function(req, res){
    console.log("server is listening on port 3000!");
})
