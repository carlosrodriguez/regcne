express = require "express"
http = require "http"

app = express()
server = http.createServer(app)
io = require("socket.io").listen(server)
port = process.env.PORT || 3000

app.use(express.static('public'))

app.use(express.logger())

app.engine('html', require('ejs').renderFile)

app.get('/', (req, res) ->
  res.render('index.html')
)

server = app.listen(port)
io = require('socket.io').listen(server)

io.configure( () ->
  io.set("transports", ["xhr-polling"])
  io.set("polling duration", 10)
)

server.listen(app.get('port'), () ->
  console.log("Express server listening on port " + app.get('port'))
)

Twitter = require "ntwitter"

twit = new Twitter({
  consumer_key: "zthiZ9hmH6DiTqddsx5jlQ"
  consumer_secret: "tMM9ODZEhl5kkNyDUZC5lsZV09fRmGmEi0pn24hd9tU",
  access_token_key: "16060830-5bdzNphNWVAuzmZhraBn4W8Vxk8hUlSwveJ1nwzBa",
  access_token_secret: "KfMXs0GO5TvtfwTWH6GxDUP4z3843x68PN9L9y3Awc"
})

# twit.verifyCredentials( (err, data) ->
#   console.log data
#   return
# ).updateStatus('Test tweet from ntwitter/' + Twitter.VERSION,(err, data) ->
#   console.log data, err
#   return
# )

capriles = 0
caprilesminute = 0
caprileshour = 0
caprilestotal = 0
chavez = 0
chavezminute = 0
chavezhour = 0
chaveztotal = 0
combined = 0

io.sockets.on('connection', (socket) ->
  

  sendCounters = () ->
    message =
      capriles: capriles
      caprilesminute: caprilesminute
      caprileshour: caprileshour
      caprilestotal: caprilestotal
      chavez: chavez
      chavezminute: chavezminute
      chavezhour: chavezhour
      chaveztotal: chaveztotal
      combined: combined

    socket.broadcast.emit("counter", message)

  timer = () ->
    console.log "Counter"
    sendCounters()
    capriles  = 0
    chavez = 0
    setTimeout timer, 1000
    return

  minutes = () ->
    console.log "Minutes"
    sendCounters()
    caprilesminute  = 0
    chavezminute = 0
    setTimeout timer, 60000
    return

  hours = () ->
    console.log "Hours"
    sendCounters()
    caprileshour  = 0
    chavezhour = 0
    setTimeout timer, 3600000
    return

  twit.stream("user", {track: "chavez"}, (stream) ->
    stream.on("data", (data) ->
      console.log data.text
      # console.log "me", capriles, chavez
      
      if(typeof(data.text) != "undefined")
        if(data.text.match(/chavez/g))
          console.log(data.text.match(/chavez/g))
          chavez += 1
          chavezminute += 1
          chavezhour += 1
          chaveztotal += 1
        else
          capriles += 1
          caprilesminute += 1
          caprileshour += 1
          caprilestotal += 1

        combined += 1
      return
    )
    
    setTimeout timer, 1000
    setTimeout minutes, 60000
    setTimeout hours, 3600000

    stream.on("end", (response) ->
      # Handle a disconnection
      console.log "disconnect"
    )

    stream.on("error", (response) ->
      # Handle a disconnection
      console.log "error"
    )
  )
)

server.listen(port)