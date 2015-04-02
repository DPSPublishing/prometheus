Handlebars = require('handlebars');

module.exports = function(robot) {
	robot.router.get('/', function(req, res) {

		var template = require('./../build/js/templates.js');

		res.send(JSON.stringify(template))

	});

	robot.router.get('asset/:type/:file', function(req, res) {
		res.send('todo');
	});
}
