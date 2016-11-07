'use strict'

const db 		= require('../db')
const handler 	= module.exports = {}
const util 		= require('../util')

handler.get = function *() {

	console.log(this.query)

    var data = yield db.model.sectionslide.find({}).populate('slide')
	this.body = data
}