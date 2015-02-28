publications = require './applications/publications'

module.exports = (robot) ->

  ask = (robot, msg) ->
    msg.send 'What are you having an issue with?'
    robot.eatOneResponse msg.message.user, (msg) ->

      msg.send 'picked: ' + msg.match[1].toLowerCase()

      switch msg.match[1].toLowerCase()
        when 'publications', 'publication', 'pubs', 'p'
          publications robot, msg
        else
          msg.send 'Sorry that is not a valid answer\nPlease pick one of\n - Publications'
          ask robot, msg


  robot.respond /(report)/i, (msg) ->
    if msg.envelope.room == msg.envelope.user.name
      ask robot, msg
    else
      msg.reply 'PM me please'
