const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

mongoose.model('EduUserJuly', UserSchema);

module.exports = mongoose.model('EduUserJuly')