var wit = require('node-wit');
var ACCESS_TOKEN = "MF7M4K3LKXEHQ3NCTFEXMUQNQOMWRLY3";


module.exports = function (robot) {
  robot.respond(/wit (.*)/,function (msg) {
    console.log("asking wit '" + msg.match[1] + "'");
    wit.captureTextIntent(ACCESS_TOKEN, msg.match[1], function (err, res) {
       console.log("Response from Wit for text input: ");
       if (err) console.log("Error: ", err);
       console.log(JSON.stringify(res, null, " "));
    });
  });
}
