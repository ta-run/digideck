var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var schema = new Schema({
	deck: {
        type: Schema.Types.ObjectId,
        required: true
    },
	section: {
        type: Schema.Types.ObjectId,
        ref: 'section',
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

module.exports = mongoose.model('decksection', schema);
module.exports.schema = schema;