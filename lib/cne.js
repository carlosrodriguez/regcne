var Twitter, app, express, http, io, port, server, twit;

express = require("express");

http = require("http");

app = express();

server = http.createServer(app);

io = require("socket.io").listen(server);

port = process.env.PORT || 3000;

app.use(express["static"]('public'));

app.use(express.logger());

app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
  return res.render('index.html');
});

server = app.listen(port);

io = require('socket.io').listen(server);

server.listen(app.get('port'), function() {
  return console.log("Express server listening on port " + app.get('port'));
});

Twitter = require("ntwitter");

twit = new Twitter({
  consumer_key: "zthiZ9hmH6DiTqddsx5jlQ",
  consumer_secret: "tMM9ODZEhl5kkNyDUZC5lsZV09fRmGmEi0pn24hd9tU",
  access_token_key: "16060830-5bdzNphNWVAuzmZhraBn4W8Vxk8hUlSwveJ1nwzBa",
  access_token_secret: "KfMXs0GO5TvtfwTWH6GxDUP4z3843x68PN9L9y3Awc"
});

io.sockets.on('connection', function(socket) {
  var counter, timer;
  counter = 0;
  timer = function() {
    console.log("Counter");
    console.log(counter);
    socket.broadcast.emit("capriles", {
      capriles: counter
    });
    counter = 0;
    setTimeout(timer, 1000);
  };
  return twit.stream("user", {
    track: "hay un camino, capriles"
  }, function(stream) {
    stream.on("data", function(data) {
      return counter += 1;
    });
    stream.on("end", function(response) {});
    stream.on("destroy", function(response) {
      return console.log(counter);
    });
    return setTimeout(timer, 1000);
  });
});

server.listen(port);
