

var Handlebars = require('handlebars');

module.exports = function(robot) {
	view = require('./../src/view.js')(robot);
	robot.router.get('/', function(req, res) {

		res.send(view('index', {robot: robot}))

	});

	robot.router.get('asset/:type/:file', function(req, res) {
		res.send('todo');
	});
}
