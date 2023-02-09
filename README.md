# LOGIN
    



# hackatweet_backend
# CHANGE PAGE
 window.location.href = '/home';

 # SOUS DOCUMENTS
const addressSchema = mongoose.Schema({
 street: String,
 city: String,
});

const userSchema = mongoose.Schema({
 firstName: String,
 lastName: String,
 email: String,
 address: addressSchema,
});

const User = mongoose.model('users', userSchema);
