'use strict';

const router 	= require('koa-router')() // router middleware for koa
const handler  	= require('./handler')

router.get('/', function() {
	this.body = "Don't forget, we're the bad guys.";
})

router.get('/user', handler.user.get)
router.post('/user', handler.user.post)

module.exports = router.middleware();