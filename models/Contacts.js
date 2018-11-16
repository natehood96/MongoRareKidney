var mongoose = require('mongoose');
var ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});
mongoose.model('Contact', ContactSchema);