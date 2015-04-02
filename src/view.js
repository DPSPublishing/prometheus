var views = require('./../build/js/templates.js');


module.exports = function(robot) {

	return function (view, data) {

		var data = data || {};

		data.robot = robot;
		data.users = robot.brain.users;

		return views(data);

	}
}
