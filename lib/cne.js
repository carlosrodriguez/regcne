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

io.configure(function() {
  io.set("transports", ["xhr-polling"]);
  return io.set("polling duration", 10);
});

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
  var capriles, chavez, timer;
  capriles = 0;
  chavez = 0;
  timer = function() {
    console.log("Counter");
    socket.broadcast.emit("counter", {
      capriles: capriles,
      chavez: chavez
    });
    capriles = 0;
    chavez = 0;
    setTimeout(timer, 1000);
  };
  return twit.stream("user", {
    track: "chavez"
  }, function(stream) {
    stream.on("data", function(data) {
      console.log(data.text);
      if (typeof data.text !== "undefined") {
        if (data.text.match(/chavez/g)) {
          console.log(data.text.match(/chavez/g));
          return chavez += 1;
        } else {
          return capriles += 1;
        }
      }
    });
    setTimeout(timer, 1000);
    stream.on("end", function(response) {
      return console.log("disconnect");
    });
    return stream.on("error", function(response) {
      return console.log("error");
    });
  });
});

server.listen(port);
