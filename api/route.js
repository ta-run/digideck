'use strict';

const router 	= require('koa-router')() // router middleware for koa
const handler  	= require('./handler')

router.get('/', function() {
	this.body = "Don't forget, we're the bad guys."
})

router.get('/user', handler.user.get)
router.post('/user', handler.user.post)

router.get('/deck', handler.deck.get)

router.redirect('/industry', '/admin/industry')

router.get('/admin/:entity', handler.admin.get)
router.post('/admin/:entity', handler.admin.post)
router.delete('/admin/:entity', handler.admin.delete)
router.patch('/admin/:entity/:id', handler.admin.patch)
// router.delete('/admin/:entity', handler.admin.delete)

module.exports = router.middleware()