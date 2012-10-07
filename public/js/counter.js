var domain = document.location.hostname,
	path = (domain === "localhost" || domain === "192.168.33.10") ? "http://localhost:3000/" : '/',
	socket = io.connect(path); // Initiate socket connection

socket.on("counter", function (data) {
	var caprilesbar = (data.caprilestotal * 100) / data.combined,
		chavezbar = 100 - caprilesbar;

	// console.log(data);

	// Seriuosly? use a template please.
	$("#caprilesbar").css("width",caprilesbar+"%");
	$("#chavezbar").css("width",chavezbar+"%");

	$("#caprilespercent").text(caprilesbar.toFixed(2)+"%");
	$("#chavezpercent").text(chavezbar.toFixed(2)+"%");

	$("#capriles").text(data.capriles);
	$("#caprilesrecord").text(data.caprilesrecord);
	$("#caprilesminute").text(data.caprilesminute);
	$("#caprilesminuterecord").text(data.caprilesminuterecord);
	$("#caprileshour").text(data.caprileshour);
	$("#caprileshourrecord").text(data.caprileshourrecord);
	$("#caprilestotal").text(data.caprilestotal);


	$("#chavez").text(data.chavez);
	$("#chavezrecord").text(data.chavezrecord);
	$("#chavezminute").text(data.chavezminute);
	$("#chavezminuterecord").text(data.chavezminuterecord);
	$("#chavezhour").text(data.chavezhour);
	$("#chavezhourrecord").text(data.chavezhourrecord);
	$("#chaveztotal").text(data.chaveztotal);
});

/* Dom Stuff */

$("document").ready(function(){
	console.log("Loaded")
})