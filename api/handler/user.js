'use strict';

const db 		= require('../db')
const handler 	= module.exports = {}
const util 		= require('../util')

handler.get = function *() {

	console.log(this.query)

    var users = yield db.model.user.find({}).lean()
	this.body = users
}

handler.post = function *() {

	var user = yield db.model.user.findOne({email: this.request.body.email}).lean()

	if (!user) {
		// no user found for given email . lets create a new one instead.
		user = createUser(this.request.body)
		yield user.save()
		user = user.toObject()
	}

	// claim object for jwt.
	var claim = {}
	claim.name = user.full_name
	claim.email = user.email

	var token = util.jwt.generateToken(claim)
	this.body = {user: user, token: token}
}

function createUser(body) {
	var user = db.model.user()
	user.full_name = body.full_name
	user.email = body.email
	return user
}