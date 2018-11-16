var mongoose = require('mongoose');
var AnnouncementSchema = new mongoose.Schema({
  title: String,
  text: String,
  date: String
});
mongoose.model('Announcement', AnnouncementSchema);