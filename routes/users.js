var express = require('express');
var router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const uid2 = require('uid2');
const { getHashTags } = require('../modules/getHashTags');

/* SIGN UP A USER */
router.post('/signup', function (req, res) {
	if (req.body.username.trim() === '' || req.body.firstname.trim() === '' || req.body.password.trim() === '') {
		res.json({ result: false, error: 'Missing or Empty fields' });
		return;
	}

	User.findOne({ username: req.body.username }).then((data) => {
		if (data === null) {
			const hash = bcrypt.hashSync(req.body.password, 10);
			const newUser = new User({
				firstname: req.body.firstname,
				username: req.body.username,
				password: hash,
				token: uid2(32),
			});
			newUser.save().then((data) => res.json({ result: true, data: data }));
		} else {
			res.json({ result: false, error: 'User is already registered' });
		}
	});
});

/* SIGN IN ALREADY EXISTING USER */

router.post('/signin', (req, res) => {
	if (req.body.username.trim() === '' || req.body.password.trim() === '') {
		res.json({ result: false, error: 'Missing or empty fields' });
		return;
	}

	User.findOne({ username: req.body.username }).then((data) => {
		if (data && bcrypt.compareSync(req.body.password, data.password)) {
			res.json({ result: true, token: data.token });
		} else {
			res.json({ result: false, error: 'User not found / Wrong creditentials' });
		}
	});
});

router.post('/addTweet',(req,res)=>{
	const hashtags = getHashTags(req.body.tweetContent)
	User.updateOne(
		{username:req.body.username},
		{$push:{tweets:[{ date: Date.now(), tweetContent:req.body.tweetContent, likes: 0,hashtags:hashtags}]}}
	).then(data=>res.json({result:true}))
})

router.get('/getTweetsByUserName/:username',(req,res)=>{
	User.findOne({username:req.params.username})
		.then(data=>res.json({result:true,userData:{username:data.username,firstname:data.firstname,token:data.token},tweets:data.tweets.filter(obj=>obj.tweetContent.trim())}))

})
router.delete('/deleteAll',(req,res)=>{
	User.deleteMany().then(res.json({result:true}))
})

router.get('/getAllTweets',(req,res)=>{
	User.find().then((data)=>{
		const transformedData = [];

		for (const user of data) {
			for (const tweet of user.tweets) {
				transformedData.push({
				username: user.username,
				firstname: user.firstname,
				date: tweet.date,
				tweetContent: tweet.tweetContent,
				hashtags: tweet.hashtags,
				likes: tweet.likes,
				_id: tweet._id
				});
			}
		}
		const dataSorted = transformedData.sort((a,b)=>{
			return new Date(b.date) - new Date(a.date)
		})
		res.json({allTweets:dataSorted})
	})
})

module.exports = router;
