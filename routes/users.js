var express = require('express');
var router = express.Router();
const User = require('../models/users')
/* GET users listing. */
router.post('/signup', function(req, res, next) {
  const newUser = new User({
    firstName:req.body.firstName,
    username:req.body.username,
    password:req.body.password,
    tweet:[{date:Date.now(),tweetContent:req.body.tweetContent,likes:req.body.likes}],
  })
  newUser.save().then(()=>res.send('respond with a resource'))
  
});

module.exports = router;
