// Description:
//   Rodent Motivation
//
//   Set the environment variable HUBOT_SHIP_EXTRA_SQUIRRELS (to anything)
//   for additional motivation
//
// Dependencies:
// None
//
// Configuration:
//   HUBOT_SHIP_EXTRA_SQUIRRELS
//
// Commands:
//   home time
//
// Author:
//   Benjamin

module.exports = function(robot) {
    robot.hear(/home time/i, function (res)  {

        var time = new Date();
        var homeTime = new Date();
        homeTime.setHours(17,0,0);

        var difference = homeTime.getTime() - time.getTime();

        if(difference < 0){
            res.reply('Go home you fool');
            return;
        }

        var date = new Date(difference);
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        var result = hour + ' hours ' + min + " minutes " + sec + ' seconds ';

        res.reply('You can go home in ' + result);
    });

}