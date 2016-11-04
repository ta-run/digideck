/*
* Database config file. 
* Intializes connection to database
* 
* Parag Naik
*/

const mongoose 		= require('mongoose')
const model 		= require('./models')
const _ 			= require('lodash')

require('dotenv').config({path: 'config/.env'})

// Initialize database
mongoose.connect(process.env.MONGODB_CONNECT_URL);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
    mongoose.Promise = global.Promise;
});

// exports
exports.model = model

exports.isValidObjectId = function(obj_id) {
    return Mongoose.Types.ObjectId.isValid(obj_id)
}

exports.decorateModel = function(model, modelInstance, fieldMap) {

    var model_metadata = model.schema.paths

    // process all updates fields.
    _.forEach(fieldMap, function(field_value, field_key) {
        console.log("decorateModel", field_key, field_value)

        if (model_metadata[field_key]) {

            var datatype = String(model_metadata[field_key].options.type);

            if ("ObjectID" == model_metadata[field_key].instance) {
                console.log(field_key, "is a objectID")
                modelInstance[field_key] = field_value;
            }

            if ("String" == model_metadata[field_key].instance) {
                console.log(field_key, "is a string")
                modelInstance[field_key] = field_value;
            } else if (datatype.indexOf("Boolean") != -1) {
                console.log(field_key, "is a boolean")
                modelInstance[field_key] = field_value
            } else if ("Number" == model_metadata[field_key].instance) {
                console.log(field_key, "is a Number")
                modelInstance[field_key] = field_value
            } else if ("Array" == model_metadata[field_key].instance) {
                console.log(field_key, "is a Array")
                modelInstance[field_key].append(field_value)
            }

        } else {
            console.log("decorateModel ", "cannot find key ", field_key)
        }

        return modelInstance
    })
}