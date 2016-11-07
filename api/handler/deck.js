'use strict';

const db 		= require('../db')
const handler 	= module.exports = {}
const util 		= require('../util')

handler.get = function *(next) {

    var deck = yield db.model.deck.findOne(this.queryParams)

    if(!deck) {
    	this.throw(422, 'Deck not found')
    }

    var deckResult = []

    deck = deck.toObject()

    var deckdetails = yield db.model.decksection.find({deck: deck._id}).populate('section').lean()
    var sections = yield getSections(deckdetails)

    this.body = sections
}

var getSections = function *(deckdetails) {

	var sectionlist = []

    for (let item of deckdetails) {
    	var section = item.section
    	section.sequence = item.sequence

        var sectionslides = yield db.model.sectionslide.find({section: item.section}).populate('slide').lean()
        section.slide = yield getSlides(sectionslides)

    	sectionlist.push(section)
    }

    return sectionlist
}

var getSlides = function *(sectionslides) {

	var slideList = []

	for (let item of sectionslides) {
		item.slide.sequence = item.sequence
		slideList.push(item.slide)
	}

	return slideList
}

