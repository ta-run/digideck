'use strict';

const db 		= require('../db')
const handler 	= module.exports = {}
const util 		= require('../util')

handler.get = function *(next) {

	var model = db.model[this.params.entity]

	if (!model) {
		this.throw(420, 'Invalid entity', 'Invalid entity')
		return
	}
	
	var data = yield model.find(this.queryParams).lean()
	this.body = data
	//this.body = model.schema.paths
}

handler.getByEntity = function *(entity) {
	var data = yield model.find(entity).lean()
	this.body = data
}


handler.post = function *(next) {

	var model = db.model[this.params.entity]

	if (!model) {
		this.throw(420, 'Invalid entity', 'Invalid entity')
		return
	}

	var data = new model();
	db.decorateModel(model, data, this.request.body)

	yield data.save()
	this.body = data
}

handler.delete = function *(next) {

	var model = db.model[this.params.entity]

	if (!model) {
		this.throw(420, 'Invalid entity', 'Invalid entity')
		return
	}

	var result = yield model.remove({})

	this.body = result
}

handler.patch = function *(next) {

	var model = db.model[this.params.entity]

	if (!model) {
		this.throw(420, 'Invalid entity', 'Invalid entity')
		return
	}

	if (!this.params.id) {
		this.throw(420, 'Invalid object id')
		return
	}

	var data = yield model.findById(this.params.id)

	var data = new model();
	db.decorateModel(model, data, this.request.body)

	yield data.save()
	this.body = data
}