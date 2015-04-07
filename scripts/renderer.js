var views = require('./../build/bin/templates.js');
var Handlebars = require('handlebars');

module.exports = function (robot) {
  robot.render = function (view, data) {

		var data = data || {};

		data.robot = robot;

    if (robot.adapterName === 'shell') {
      robot.brain.data.users = [
        {id: 1, name: 'thomas'},
        {id: 2, name: 'bens'},
        {id: 3, name: robot.name},
      ]
    }
		data.users = robot.brain.data.users;

		var template = Handlebars.template(views.templates[view]);
		return template(data);

	}
}
