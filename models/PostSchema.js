const mongoose = require('mongoose');

const postShema = new mongoose.Schema({
    user : String,
    body : String,
    date : Date,
});

module.exports = mongoose.model('Post', postShema);