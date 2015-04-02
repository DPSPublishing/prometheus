module.exports = function(robot) {
    robot.router.post('/bitbucket/push', function(req, res) {
        var site = req.params.site;
        var data = {commits:[]};
        if (req.body.payload) {
            data = JSON.parse(req.body.payload);
        }
        var users = [];

        var attachments = []

        if (data.commits) {
            for (j = 0, len = data.commits.length; j < len; j++) {
                commit = data.commits[j];
                if (users.indexOf(commit.author) === -1) {
                    users.push(commit.author);
                }
                var pretext = ''
                if (j === 0) {
                    pretext = "New commits to " + data.repository.name
                }

                attachments.push({
                    // see https://api.slack.com/docs/attachments
                    pretext: pretext,
                    color: "#439FE0",
                    title: commit.node + ' ' + commit.message.split("\n")[0],
                    title_link: 'https://bitbucket.org' + data.repository.absolute_url + 'commits/' + commit.raw_node,
                    fallback: commit.message,
                    fields: [,
                        {
                            "title": "Commiter",
                            "value": commit.author,
                            "short": true
                        },
                        {
                            "title": "Branch",
                            "value": commit.branch,
                            "short": true
                        }
                    ]
                });
            }
        }

        // for (j = 0, len = content.length; j < len; j++) {
            robot.emit('slack.attachment', {
                content: {
                    attachments: attachments
                },
                channel: "#deployment"
            });
        // }

        res.send('OK');

    });
}
