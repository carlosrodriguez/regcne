var Twitter, app, capriles, caprileshour, caprilesminute, caprilestotal, chavez, chavezhour, chavezminute, chaveztotal, combined, express, http, io, port, server, twit;

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

capriles = 0;

caprilesminute = 0;

caprileshour = 0;

caprilestotal = 0;

chavez = 0;

chavezminute = 0;

chavezhour = 0;

chaveztotal = 0;

combined = 0;

io.sockets.on('connection', function(socket) {
  var hours, minutes, sendCounters, timer;
  sendCounters = function() {
    var message;
    message = {
      capriles: capriles,
      caprilesminute: caprilesminute,
      caprileshour: caprileshour,
      caprilestotal: caprilestotal,
      chavez: chavez,
      chavezminute: chavezminute,
      chavezhour: chavezhour,
      chaveztotal: chaveztotal,
      combined: combined
    };
    return socket.broadcast.emit("counter", message);
  };
  timer = function() {
    console.log("Counter");
    sendCounters();
    capriles = 0;
    chavez = 0;
    setTimeout(timer, 1000);
  };
  minutes = function() {
    console.log("Minutes");
    sendCounters();
    caprilesminute = 0;
    chavezminute = 0;
    setTimeout(timer, 60000);
  };
  hours = function() {
    console.log("Hours");
    sendCounters();
    caprileshour = 0;
    chavezhour = 0;
    setTimeout(timer, 3600000);
  };
  return twit.stream("user", {
    track: "chavez"
  }, function(stream) {
    stream.on("data", function(data) {
      console.log(data.text);
      if (typeof data.text !== "undefined") {
        if (data.text.match(/chavez/g)) {
          console.log(data.text.match(/chavez/g));
          chavez += 1;
          chavezminute += 1;
          chavezhour += 1;
          chaveztotal += 1;
        } else {
          capriles += 1;
          caprilesminute += 1;
          caprileshour += 1;
          caprilestotal += 1;
        }
        combined += 1;
      }
    });
    setTimeout(timer, 1000);
    setTimeout(minutes, 60000);
    setTimeout(hours, 3600000);
    stream.on("end", function(response) {
      return console.log("disconnect");
    });
    return stream.on("error", function(response) {
      return console.log("error");
    });
  });
});

server.listen(port);
