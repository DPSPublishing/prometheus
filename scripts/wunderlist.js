var WunderlistSDK = require('wunderlist');
var wunderlist = new WunderlistSDK({
  'accessToken': 'd61f02f4be4cb3f63d040a5c3b94cc4aa554d823d072ee39f621e3db9ee7',
  'clientID': 'fc8b2aa93e360082fd16'
});

module.exports = function(robot) {

    robot.respond(/my lists/i, function (msg) {
        wunderlist.http.lists.all()
          .done(function (lists) {
            msg.reply(lists);
          })
          .fail(function () {
            msg.reply('there was a problem');
          });
    }

}
