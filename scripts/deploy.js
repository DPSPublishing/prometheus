module.exports = function(robot) {


  robot.hear(/^hubot:? (.+)/i, function (res) {
    var response = "Sorry, I'm a diva and only respond to #{robot.name}";
    if  (robot.alias) {response += " or #{robot.alias}"}
    res.reply(response)
    return;
  });
    
  robot.hear(/(who are you|what are you|who is)/i, function (res) {
    if (res.message.text.indexOf('prometheus') != -1) {
      res.reply('I am the almighty Prometheus.\nI am here to help with all things helpful.\nTo see what I can do type `@prometheus: help`');
    }
  });
  robot.router.post('/bitbucket/push', function(req, res) {
      var data = {commits:[]};
      if (req.body.payload) {
        data = JSON.parse(req.body.payload);
      }
      commits = robot.brain.get('commits') || [];



      var attachments = []

      if (data.commits) { for (j = 0, len = data.commits.length; j < len; j++) {

        var commit = data.commits[j];
        commit.repository = data.repository;
        commits.unshift(commit);

        var pretext = ''
        if (j === 0) {
          pretext = "New commits to " + data.repository.name
        }

        attachments.push({
            // see https://api.slack.com/docs/attachments
          pretext: pretext,
          color: "#439FE0",
          title: commit.node.substr(4) + '... ' + commit.message.split("\n")[0],
          title_link: 'https://bitbucket.org' + data.repository.absolute_url + 'commits/' + commit.raw_node,
          fallback: commit.message.split("\n")[0],
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

      }}
      robot.brain.set('commits', commits);

      robot.emit('slack.attachment', {
          content: {
              attachments: attachments
          },
          channel: "#deployment"
      });


      res.send('OK');

  });
}
