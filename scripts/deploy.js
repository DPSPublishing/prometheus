module.exports = function(robot) {
    robot.router.post('/deploy/:site', function(req, res) {
        var site = req.params.site;
        var data = {commits:[]};
        if (req.body.payload) {
            data = JSON.parse(req.body.payload);
        }
        var users = [];

        var content = [];
        var fields = [];

        if (data.commits) {
            for (j = 0, len = data.commits.length; j < len; j++) {
                commit = data.commits[j];
                if (users.indexOf(commit.author) === -1) {
                    users.push(commit.author);
                }

                fields.push({
                    "title": "Commiter",
                    "value": commit.author,
                    "short": true
                });
                fields.push({
                    "title": "Message",
                    "value": commit.message,
                    "short": true
                });


            }
        }

        var pretext = "New commits to " + data.repository.name
        content = {
            // see https://api.slack.com/docs/attachments
            pretext: pretext,
            color: "#439FE0",
            fallback: commit.message,
            fields: fields
        };

        // for (j = 0, len = content.length; j < len; j++) {
            robot.emit('slack.attachment', {
                content: content,
                channel: "#deployment"
            });
        // }

        res.send('OK');

    });
}
