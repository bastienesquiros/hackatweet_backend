var express = require('express');
var router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const uid2 = require('uid2');

/* SIGN UP A USER */
router.post('/signup', function (req, res) {
	if (req.body.username === '' || req.body.firstname === '' || req.body.password === '') {
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
				tweets: [{ date: Date.now(), tweetContent: '', likes: 0 }],
			});
			newUser.save().then((data) => res.json({ result: true, data: data }));
		} else {
			res.json({ result: false, error: 'User is already registered' });
		}
	});
});


/* SIGN IN ALREADY EXISTING USER */

router.post('/signin', (req, res) => {
	if (req.body.username === '' || req.body.password === '') {
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

module.exports = router;
