var views = require('./../build/js/templates.js');


module.exports = function(robot) {

	return function (view, data) {

		var data = data || {};

		data.robot = robot;
		data.users = robot.brain.data.users;

		return views(data);

	}
}
