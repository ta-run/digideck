var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var schema = new Schema({
	name: {
		type: String,
		required: true
	},
	sequence: {
		type: Number,
		index: true,
		required: true
	},
	created_date: {
		type: Date,
		default: Date.now
	},
	updated_date: {
		type: Date,
		default: Date.now
	},
	active: {
		type: Boolean,
		default: true
	}
})

// vituals

// methods

// export

module.exports = mongoose.model('industry', schema);
module.exports.schema = schema;