const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
	name: {
        type: String,
        required: true,
        trim: true
    },
    dateofbirth: {
        type: Date,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    username: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	}
});

// hashes each password
UserSchema.pre('save', function (next) {
	const user = this;

	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);

			user.password = hash;
			next();
		});
	});
});

// method to compare password
UserSchema.methods.comparePasswords = function(candidatePassword, callback) {
	const user = this;
  
	bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
	  if (err) return callback(err);
  
	  callback(null, isMatch);
	})
  }

module.exports = mongoose.model('User', UserSchema);