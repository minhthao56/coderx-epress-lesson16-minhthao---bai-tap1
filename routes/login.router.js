var express = require('express');
var router = express.Router();
var shortid = require('shortid');
var controller = require("../controllers/controller.login")
var db = require('../db');



router.get("/login", controller.getlogin);

router.post("/login", controller.postlogin);





module.exports = router;
