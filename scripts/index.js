
var express = require('express');
var path = require('path');
var Handlebars = require('handlebars');

module.exports = function(robot) {
	robot.router.get('/', function(req, res) {

		res.send(robot.render('index'));

	});

	robot.router.get('/users', function(req, res) {

		res.send(robot.render('users'));

	});

	robot.router.use(express.static(path.join(__dirname, '/../build/public')));
}
