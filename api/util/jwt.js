const jwt = require('jsonwebtoken')
const privateKey = 'SOME_PRIVATE_KEY'

var auth = {};

auth.generateToken = function(claim) {
	var token = jwt.sign(claim, privateKey)
	return token
}

auth.validate = function(request) {

	var claim = jwt.verify(request.token, privateKey)
	return claim
};

module.exports = auth