var Twitter, counter, timer, twit;

Twitter = require("ntwitter");

twit = new Twitter({
  consumer_key: "zthiZ9hmH6DiTqddsx5jlQ",
  consumer_secret: "tMM9ODZEhl5kkNyDUZC5lsZV09fRmGmEi0pn24hd9tU",
  access_token_key: "16060830-5bdzNphNWVAuzmZhraBn4W8Vxk8hUlSwveJ1nwzBa",
  access_token_secret: "KfMXs0GO5TvtfwTWH6GxDUP4z3843x68PN9L9y3Awc"
});

counter = 0;

timer = function() {
  0;
  counter = 0;
  setTimeout(timer, 1000);
};

twit.stream("user", {
  track: "hay un camino, capriles"
}, function(stream) {
  stream.on("data", function(data) {
    return counter += 1;
  });
  stream.on("end", function(response) {});
  stream.on("destroy", function(response) {
    return 0;
  });
  return setTimeout(timer, 1000);
});
