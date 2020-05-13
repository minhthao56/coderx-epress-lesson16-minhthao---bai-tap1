var shortid = require('shortid');
var db = require('../db');
var express = require('express')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
var md5 = require('md5');
var app = express()
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())



module.exports.getlogin = function (req, res, next) {
    res.render("auth/login");
};

module.exports.postlogin = function(req,res, next){
    var email = req.body.email;
    var pass = md5(req.body.pass)
    var user = db.get("users").find({email: email}).value();
    var dbtransOfuser = db.get("trans").filter({userId: user.id}).value();
    var bookOfuser=[];
    for ( tran of dbtransOfuser){
        var Objbook=db.get("titles").find({id: tran.bookId}).value();
        bookOfuser.push(Objbook)
    }
    if (!user){
        res.render("auth/login",{
           err: "Wrong email",
           values:req.body
        });
    }
    else if (user.pass !== pass) {
        res.render("auth/login",{
            err: "Wrong Password",
            values:req.body
         });
    }else{
        res.cookie("userId", user.id)
        res.redirect('/books');
    }
}
