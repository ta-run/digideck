var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var schema = new Schema({
	template_type: {
		type: String,
		enum: ['default'],
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	img_url: {
		type: String
	},
	video_url: {
		type: String
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
	
module.exports = mongoose.model('slide', schema);
module.exports.schema = schema;