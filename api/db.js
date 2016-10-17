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