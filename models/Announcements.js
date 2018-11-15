var mongoose = require('mongoose');
var AnnouncementSchema = new mongoose.Schema({
  title: String,
  text: String,
  date: {type: Date, default: new Date()},
});
mongoose.model('Announcement', AnnouncementSchema);