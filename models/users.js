const mongoose = require('mongoose')

const tweetSchema = mongoose.Schema({
    date:Date,
    tweetContent:String,
    likes:Number,
})

const usersSchema = mongoose.Schema({
    firstName:String,
    username:String,
    password:String,
    tweet:tweetSchema,

})

const User = mongoose.model('users',usersSchema);

module.exports = User;