

module.exports = (robot) ->
	robot.router.get '/deploy/:site', (req, res) ->
		site = req.params.site
		data = JSON.parse req.body.payload

		robot.messageRoom 'depolyment', "I have a secret: #{site}"
