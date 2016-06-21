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
//   home time - displays the number of hours until it is time to go home
//
// Author:
//   Benjamin

module.exports = function(robot) {
    robot.hear(/home time/i, function (res)  {

        var now = new Date();
        var homeTime = new Date();

        homeTime.setHours(17);
        homeTime.setMinutes(0);
        homeTime.setSeconds(0);
        homeTime.setMilliseconds(0);

        var difference = homeTime.getTime() - now.getTime();

        if(difference < 0){
            res.reply('Fly you fool');
            return;
        }

        var seconds = parseInt(difference / 1000);
        var minutes = parseInt(seconds / 60) % 60;
        var hours = parseInt((seconds / 60) / 60) % 60;

        seconds = seconds % 60;
        var parts = []
        if (hours > 0) {
            parts.push(hours + ' hours')
        }
        if (minutes > 0) {
            parts.push(minutes + ' minutes')
        }
        if (seconds > 0) {
            parts.push(seconds + ' seconds')
        }

        var result = parts.join(' ');

        res.reply('You can go home in ' + result);
        res.reply('But only if you are good!!');
    });

    robot.hear(/is everything broken/i, function (res)  {

        var people = ['@benjamin', '@fenski', '@rogie', '@thattomperson', 'someone', 'undefined'];
        var randomName = people[Math.floor((Math.random() * people.length))];

        res.reply('Yes. I believe ' + randomName + ' did it.');
    });

}
