'use strict';

const db = require('../db')
const handler = module.exports = {};

handler.get = function *() {
	console.log(db)
    var users = yield db.model.user.find({}).lean()
	this.body = users
}

handler.post = function *() {

	var user = createUser(this.request.body)

	yield user.save()
	this.body = user
}


function createUser(body) {
	var user = db.model.user()
	user.full_name = body.full_name
	user.email = body.email
	return user
}