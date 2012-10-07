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


io.sockets.on('connection', (socket) ->
  capriles = 0
  chavez = 0

  timer = () ->
    console.log "Counter"
    socket.broadcast.emit("counter", {capriles: capriles, chavez: chavez})
    capriles  = 0
    chavez = 0
    setTimeout timer, 1000
    return

  twit.stream("user", {track: "chavez"}, (stream) ->
    stream.on("data", (data) ->
      console.log data.text
      # console.log "me", capriles, chavez
      
      if(typeof(data.text) != "undefined")
        if(data.text.match(/chavez/g))
          console.log(data.text.match(/chavez/g))
          chavez += 1
        else
          capriles += 1
    )
    
    setTimeout timer, 1000

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