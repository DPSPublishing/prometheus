
module.exports = function(robot) {
	robot.respond(/tell me a joke/i, function () {
		robot.postJokeOfTheDay();
	});
	robot.postJokeOfTheDay = function () {
		console.log(robot.http('http://reddit.com/r/jokes/top.json').get())

		return
			(function (err, res, body) {
				if (err) console.log("Encountered an error :( " + err);
				console.log('data', body);		
				return
				// var post = body.data.children[0].data;

				return robot.reply(body);

				robot.emit('slack-attachment', {
					channel: "@thattomperson", 
					attachments: {
						fallback: post.title + ": " + post.selftext,
						pretext: post.title,
						text: post.selftext,
					}
				});
			})
	}
}