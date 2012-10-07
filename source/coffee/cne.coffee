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
  counter = 0

  timer = () ->
    console.log "Counter"
    console.log counter
    socket.broadcast.emit("capriles", {capriles: counter})
    counter  = 0
    setTimeout timer, 1000
    return


  twit.stream("user", {track: "hay un camino, capriles"}, (stream) ->
    stream.on("data", (data) ->
      # console.log data
      counter += 1
    )
    stream.on("end", (response) ->
      # Handle a disconnection
    )
    stream.on("destroy", (response) ->
      # Handle a 'silent' disconnection from Twitter, no end/error event fired
      console.log counter
    )
    # Disconnect stream after five seconds
    setTimeout timer, 1000
  )
)

server.listen(port)