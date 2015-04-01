module.exports = function(robot) {
    robot.router.post('/deploy/:site', function(req, res) {
        var site = req.params.site;
        var data = {commits:[]};
        if (req.body.payload) {
            data = JSON.parse(req.body.payload);
        }
        var users = [];

        var content = []

        if (data.commits) {
            for (j = 0, len = data.commits.length; j < len; j++) {
                commit = data.commits[j];
                if (users.indexOf(commit.author) === -1) {
                    users.push(commit.author);
                }

                content.push({
                    // see https://api.slack.com/docs/attachments
                    pretext: "New commits from " + users_string,
                    color: "#439FE0",
                    fallback: "Total of " + data.commits.length + " commits",
                    fields: {
                        "title": "Message",
                        "value": commit.message,
                        "short": commit.message.length < 140 ? true : false
                    }
                });
            }
        }


        users_string = users.join(', ')

        robot.emit('slack.attachment', {
            content: content,
            channel: "#deployment"
        });

        res.send('OK');

    });
}
