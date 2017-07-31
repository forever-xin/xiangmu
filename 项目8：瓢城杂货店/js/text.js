function xx(){
	var container=document.getElementById("sizeup");
	container.appendChild(container.firstChild);
}
setInterval("xx()",3000);