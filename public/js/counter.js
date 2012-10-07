var domain = document.location.hostname,
	path = (domain === "localhost" || domain === "192.168.33.10") ? "http://localhost:3000/" : '/',
	socket = io.connect(path); // Initiate socket connection

socket.on("counter", function (data) {
	var caprilesbar = (data.caprilestotal * 100) / data.combined,
		chavezbar = 100 - caprilesbar;

	// Seriuosly? use a template please.
	$("#caprilesbar").css("width",caprilesbar+"%");
	$("#chavezbar").css("width",chavezbar+"%");

	$("#caprilespercent").text(caprilesbar.toFixed(2)+"%");
	$("#chavezpercent").text(chavezbar.toFixed(2)+"%");

	$("#capriles").text(data.capriles);
	$("#caprilesminute").text(data.caprilesminute);
	$("#caprileshour").text(data.caprileshour);
	$("#caprilestotal").text(data.caprilestotal);
	$("#chavez").text(data.chavez);
	$("#chavezminute").text(data.chavezminute);
	$("#chavezhour").text(data.chavezhour);
	$("#chaveztotal").text(data.chaveztotal);
});

/* Dom Stuff */

$("document").ready(function(){
	console.log("Loaded")
})