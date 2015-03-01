

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

		users[users.length] = commit.author for commit in data.commits if data.commits

		users = removeDuplicates users

		users_string = users.join '\n'

		robot.messageRoom 'deployment', "commits from #{users_string}"
