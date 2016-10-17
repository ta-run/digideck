var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var schema = new Schema({
	full_name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		index: true,
		unique: true,
		required: true
	},
	gcm: String,
	apn: String,
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

module.exports = mongoose.model('user', schema);
module.exports.schema = schema;