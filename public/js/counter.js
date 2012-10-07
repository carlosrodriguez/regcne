var domain = document.location.hostname,
	path = (domain === "localhost" || domain === "192.168.33.10") ? "http://localhost:3000/" : '/',
	socket = io.connect(path); // Initiate socket connection

socket.on("capriles", function (data) {
	console.log(data);

	$("#capriles").text(data.capriles);
});

/* Dom Stuff */

$("document").ready(function(){
	console.log("Loaded")
})