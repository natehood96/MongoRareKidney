var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

// ADMIN PORTAL
var Announcement = mongoose.model('Announcement');

//authentication
var auth = require("http-auth");
var basic = auth.basic({
  realm: "Admin Portal",
  file: __dirname + "/../htpasswd"
});
router.get("/admin", auth.connect(basic), (req, res) => {
  res.render('admin/portal', {user: req.user});
});

router.get("/admin/announcement", auth.connect(basic), (req, res) => {
  res.render('admin/announcement', {user: req.user});
});

router.post("/admin/announcement/db", function(req, res){
  var announcement = new Announcement(req.body);
  announcement.save(function(err, announcement){
    if(err){ return next(err); }
    res.json(announcement);
  });
});

router.get("/admin/announcement/db", function(req, res){
  Announcement.find(function(err, announcements){
    if(err){ return next(err); }
    res.json(announcements);
  });
});


module.exports = router;
