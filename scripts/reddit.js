
module.exports = function(robot) {
	robot.respond(/tell me a joke/i, function () {
		robot.postJokeOfTheDay();
	});
	robot.postJokeOfTheDay = function () {
		robot.http('http://reddit.com/r/jokes/top.json').get()
			(function (err, res, body) {
				if (err) console.log("Encountered an error :( " + err);
				
				var post = JSON.parse(body).data.children[0].data;

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