

module.exports = (robot) ->
	robot.router.post '/deploy/:site', (req, res) ->
		site = req.params.site
		data = {}
		data = JSON.parse req.body.payload if req.body.payload

		robot.messageRoom 'depolyment', "I have a secret: #{site}"
