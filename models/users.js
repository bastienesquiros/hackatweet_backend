const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
	date: Date,
	tweetContent: String,
	likes: Number,
	hashtags:[String],
});

const usersSchema = mongoose.Schema({
	firstname: String,
	username: String,
	password: String,
	token: String,
	tweets: [tweetSchema],
});

const User = mongoose.model('users', usersSchema);

module.exports = User;
