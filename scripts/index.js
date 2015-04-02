Handlebars = require('handlebars');

module.exports = function(robot) {
	robot.router.get('/', function(req, res) {

		var views = require('./../build/js/templates.js');

		res.send(views.templates.index({robot: robot}))

	});

	robot.router.get('asset/:type/:file', function(req, res) {
		res.send('todo');
	});
}
