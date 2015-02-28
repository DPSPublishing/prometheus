

module.exports = (robot, msg) ->

  ask = (robot, msg) ->
    msg.send 'are you having an issue with "creating" or "downloading"?'
    robot.eatOneResponse msg.message.user, (msg) ->

      msg.send 'picked: ' + msg.match[1].toLowerCase()

      switch msg.match[1].toLowerCase()
        when 'creating', 'create', 'c'
          msg.send 'thanks generating'
        when 'downloading', 'download', 'dl'
          msg.send 'thanks downloading'
        else
          msg.send 'Sorry that is not a valid answer\nPlease pick one of\n - Generating\n - Downloading'
          ask robot, msg

  ask robot, msg
