const mongoose = require('mongoose')

const connectionString = ''

mongoose.connect(conenctionString, {connectTimeoutMS:2000})
    .then(()=>console.log('Database connected'))
    .catch(error=>console.error(error))