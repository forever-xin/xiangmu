function channelkey(j) {
	for (var i = 1; i < 7; i++) {
		document.getElementById("channel"+i).style.backgroundPosition = "-102px 0";
		document.getElementById("menucontent"+i).style.display = "none";
	}
	document.getElementById("channel"+j).style.backgroundPosition = "0 0";
	document.getElementById("menucontent"+j).style.display = "block";
}