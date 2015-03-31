

removeDuplicates = (ar) ->
  if ar.length == 0
    return []
  res = {}
  res[ar[key]] = ar[key] for key in [0..ar.length-1]
  value for key, value of res

module.exports = (robot) ->
	robot.router.post '/deploy/:site', (req, res) ->
		site = req.params.site
		data = {}
		data = JSON.parse req.body.payload if req.body.payload
		users = []
    commits = []

		users[users.length] = commit.author for commit in data.commits if data.commits

		users = removeDuplicates users

		users_string = users.join '\n'

    robot.emit 'slack.attachment',
      content:
        # see https://api.slack.com/docs/attachments
        text: "New commits from #{users_string}"
        fallback: "New commits from #{users_string}"
        fields: [{
          title: "Field title"
          value: "Field value"
        }]
      channel: "#deployment"

		# robot.messageRoom 'deployment', "New commits from #{users_string}"
