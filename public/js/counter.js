var domain = document.location.hostname,
	path = (domain === "localhost" || domain === "192.168.33.10") ? "http://localhost:3000/" : '/',
	socket = io.connect(path); // Initiate socket connection

socket.on("counter", function (data) {
	console.log(data);
	$("#capriles").text(data.capriles);
	$("#chavez").text(data.chavez);
});

/* Dom Stuff */

$("document").ready(function(){
	console.log("Loaded")
})