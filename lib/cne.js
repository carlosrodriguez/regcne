var Twitter, app, capriles, caprileshour, caprileshourrecord, caprilesminute, caprilesminuterecord, caprilesrecord, caprilestotal, chavez, chavezhour, chavezhourrecord, chavezminute, chavezminuterecord, chavezrecord, chaveztotal, combined, express, http, io, port, server, twit;

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
  return 0;
});

Twitter = require("ntwitter");

twit = new Twitter({
  consumer_key: "zthiZ9hmH6DiTqddsx5jlQ",
  consumer_secret: "tMM9ODZEhl5kkNyDUZC5lsZV09fRmGmEi0pn24hd9tU",
  access_token_key: "16060830-5bdzNphNWVAuzmZhraBn4W8Vxk8hUlSwveJ1nwzBa",
  access_token_secret: "KfMXs0GO5TvtfwTWH6GxDUP4z3843x68PN9L9y3Awc"
});

capriles = 0;

caprilesrecord = 0;

caprilesminute = 0;

caprilesminuterecord = 0;

caprileshour = 0;

caprileshourrecord = 0;

caprilestotal = 0;

chavez = 0;

chavezrecord = 0;

chavezminute = 0;

chavezminuterecord = 0;

chavezhour = 0;

chavezhourrecord = 0;

chaveztotal = 0;

combined = 0;

io.sockets.on('connection', function(socket) {
  var hours, minutes, sendCounters, timer;
  sendCounters = function() {
    var message;
    message = {
      capriles: capriles,
      caprilesrecord: caprilesrecord,
      caprilesminute: caprilesminute,
      caprilesminuterecord: caprilesminuterecord,
      caprileshour: caprileshour,
      caprileshourrecord: caprileshourrecord,
      caprilestotal: caprilestotal,
      chavez: chavez,
      chavezrecord: chavezrecord,
      chavezminute: chavezminute,
      chavezminuterecord: chavezminuterecord,
      chavezhour: chavezhour,
      chavezhourrecord: chavezhourrecord,
      chaveztotal: chaveztotal,
      combined: combined
    };
    return socket.broadcast.emit("counter", message);
  };
  timer = function() {
    if (capriles > caprilesrecord) {
      caprilesrecord = capriles;
    }
    if (chavez > chavezrecord) {
      chavezrecord = chavez;
    }
    sendCounters();
    capriles = 0;
    chavez = 0;
    setTimeout(timer, 1000);
  };
  minutes = function() {
    0;
    if (caprilesminute > caprilesminuterecord) {
      caprilesminuterecord = caprilesminute;
    }
    if (chavezminute > chavezminuterecord) {
      chavezminuterecord = chavezminute;
    }
    sendCounters();
    caprilesminute = 0;
    chavezminute = 0;
    setTimeout(minutes, 60000);
  };
  hours = function() {
    0;
    if (caprileshour > caprileshourrecord) {
      caprileshourrecord = caprileshour;
    }
    if (chavezhour > chavezhourrecord) {
      chavezhourrecord = chavezhour;
    }
    0;
    sendCounters();
    caprileshour = 0;
    chavezhour = 0;
    setTimeout(hours, 3600000);
  };
  return twit.stream("user", {
    track: "chavez"
  }, function(stream) {
    stream.on("data", function(data) {
      if (typeof data.text !== "undefined") {
        if (data.text.match(/chavez/g)) {
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
      return 0;
    });
    return stream.on("error", function(response) {
      return 0;
    });
  });
});

server.listen(port);
