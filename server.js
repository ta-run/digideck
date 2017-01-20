'use strict'

const koa          	= require('koa')               		// Koa framework
const db 			= require('./api/db')
const body         	= require('koa-bodyparser')     	// body parser
const queryString 	= require('koa-qs')					// query string
const compose      	= require('koa-compose')       		// middleware composer
const compress     	= require('koa-compress')      		// HTTP compression
const responseTime 	= require('koa-response-time') 		// X-Response-Time middleware
const logger 		= require('koa-logger')
const jwt 			= require('jsonwebtoken')
const bearerToken	= require('koa-bearer-token')
const util 			= require('./api/util')
const _ 			= require('lodash')

const router = require('./api/route')
const app = module.exports = koa()

queryString(app)
const config = require('dotenv').config({
	path: 'config/.env'
})

// return response time in X-Response-Time header
app.use(responseTime())

// common error handling
app.use(function *(next) {
	 try {
	    yield next;
	  } catch (err) {
	  	console.log(err)
	    this.status = err.status || 500
	    this.body = { name: err.name, code: err.code, error: err.message+JSON.stringify(err.errors) }
	    this.app.emit('error', err, this)
	  }
})

// Auth Token
app.use(bearerToken())
app.use(function *(next) {

	if(this.request.token) {
		var claim = util.jwt.validate(this.request)
		if (claim) {
			this.request.tokenData = claim
		} else {
			this.throw(401, 'Invalid Token', 'Invalid Token')
		}
	} else {
  		//this.throw(401, 'Unauthorized', 'Invalid token, forgot the Bearer?')
	}	
	yield next
})

// HTTP compression
app.use(compress({}))

// parse request body into ctx.request.body
app.use(body())
app.use(function *(next) {
	var queryParams = {}
	_.assign(queryParams, this.query)
	this.queryParams = queryParams

	yield next
})
app.use(logger())
app.use(router)

app.listen(process.env.SERVER_PORT, function() {
	console.log("server started at PORT: " + process.env.SERVER_PORT)
});