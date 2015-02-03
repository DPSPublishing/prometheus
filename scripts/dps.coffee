module.exports = (robot) ->

  robot.hear /report bug/i, (msg) ->
    msg.send "To report bugs please DM them to @prometheus \n testing multi line \n ```and code```"

  robot.error (err, msg) ->
    robot.logger.error "DOES NOT COMPUTE"

    if msg?
      msg.reply "DOES NOT COMPUTE"

  robot.respond /have a soda/i, (msg) ->
    # Get number of sodas had (coerced to a number).
    sodasHad = robot.brain.get('totalSodas') * 1 or 0

    if sodasHad > 4
      msg.reply "I'm too fizzy.."

    else
      msg.reply 'Sure!'

      robot.brain.set 'totalSodas', sodasHad+1

  robot.respond /sleep it off/i, (msg) ->
    robot.brain.set 'totalSodas', 0
    robot.respond 'zzzzz'
