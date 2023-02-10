const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://hackatweet:motdepasse@hackatweet.uzkzhoy.mongodb.net/hackatweet';


mongoose
	.connect(connectionString, { connectTimeoutMS: 2000 })
	.then(() => console.log('Database connected'))
	.catch((error) => console.error(error));
