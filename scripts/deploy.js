module.exports = function(robot) {
    robot.router.post('/deploy/:site', function(req, res) {
        var site = req.params.site;
        var data = {commits:[]};
        if (req.body.payload) {
            data = JSON.parse(req.body.payload);
        }
        var users = [];

        var fields = []

        if (data.commits) {
            for (j = 0, len = data.commits.length; j < len; j++) {
                commit = data.commits[j];
                if (users.indexOf(commit.author) === -1) {
                    users.push(commit.author);
                }


                fields.push({
                    "title": "Message",
                    "value": commit.message,
                    "color": "#439FE0"
                });
            }
        }


        users_string = users.join('\n')

        robot.emit('slack.attachment',{
            content: {
                // see https://api.slack.com/docs/attachments
                text: "New commits from " + users_string,
                fallback: "New commits from " + users_string,
                fields: fields
            },
            channel: "#deployment"
        });

    }
}