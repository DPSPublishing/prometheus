
var express = require('express');
var path = require('path');
var Handlebars = require('handlebars');

module.exports = function(robot) {
	robot.router.get('/', function(req, res) {
		// render a view
		res.send(robot.render('index'));

	});

	robot.router.get('/commits', function(req, res) {
		// render a view with data
		res.send(robot.render('commits', {commits: robot.brain.get('commits')}));

	});

	robot.router.use(express.static(path.join(__dirname, '/../build/public')));
}
