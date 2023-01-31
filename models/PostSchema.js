const mongoose = require('mongoose');

const postShema = new mongoose.Schema({
    user : String,
    userSub: String,
    body : String,
    date : Date,
});

module.exports = mongoose.model('Post', postShema);