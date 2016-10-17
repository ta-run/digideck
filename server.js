'use strict'

const koa          	= require('koa')               		// Koa framework
const db 			= require('./api/db')
const body         	= require('koa-bodyparser')     	// body parser
const queryString 	= require('koa-qs')					// query string
const compose      	= require('koa-compose')       		// middleware composer
const compress     	= require('koa-compress')      		// HTTP compression
const responseTime 	= require('koa-response-time') 		// X-Response-Time middleware
const logger 		= require('koa-logger')

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
	    this.body = { name: err.name, code: err.code, error: err.message }
	    this.app.emit('error', err, this)
	  }
})

// HTTP compression
app.use(compress({}))

// parse request body into ctx.request.body
app.use(body())
app.use(logger())
app.use(router)

// DB config
// TODO

app.listen(process.env.SERVER_PORT, function() {
	console.log("server started at PORT: " + process.env.SERVER_PORT)
});