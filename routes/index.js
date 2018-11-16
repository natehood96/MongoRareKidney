var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

// ADMIN PORTAL
var Announcement = mongoose.model('Announcement');
var Contact = mongoose.model('Contact');

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

router.param('announcement', function(req, res, next, id) {
  Announcement.findById(id, function (err, announcement){
    if (err) { return next(err); }
    if (!announcement) { return next(new Error("can't find announcement")); }
    req.announcement = announcement;
    return next();
  });
});

router.delete("/admin/announcement/db/:announcement", function(req, res){
  req.announcement.remove();
  res.sendStatus(200);
});

router.get("/admin/contact", auth.connect(basic), (req, res) => {
  res.render('admin/contact', {user: req.user});
});

router.post("/admin/contact/db", function(req, res){
  var contact = new Contact(req.body);
  contact.save(function(err, contact){
    if(err){ return next(err); }
    res.json(contact);
  });
});

router.get("/admin/contact/db", function(req, res){
  Contact.find(function(err, contacts){
    if(err){ return next(err); }
    res.json(contacts);
  });
});

router.param('contact', function(req, res, next, id) {
  Contact.findById(id, function (err, contact){
    if (err) { return next(err); }
    if (!contact) { return next(new Error("can't find contact")); }
    req.contact = contact;
    return next();
  });
});

router.delete("/admin/contact/db/:contact", function(req, res){
  req.contact.remove();
  res.sendStatus(200);
});

module.exports = router;
