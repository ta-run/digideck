'use strict';

const db 		= require('../db')
const handler 	= module.exports = {}
const util 		= require('../util')

handler.get = function *() {

	console.log(this.query)

    var deck = yield db.model.deck.find(this.queryParams)
    var deckdetails = yield db.model.decksection.find({deck: deck._id})

	this.body = deckdetails
}