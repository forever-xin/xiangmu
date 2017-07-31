window.onload = function() {
	startmarquee();
	TB.widget.SimpleSlide.decoration('bill', {eventType:'mouse', effect:'scroll'});
}

function startmarquee()
{
	var lh = 110;
	var speed = 10;
	var delay = 3000;
	var t;
	var p=false;
	var o=document.getElementById("marquee");
	o.innerHTML+=o.innerHTML;
	o.onmouseover=function(){p=true}
	o.onmouseout=function(){p=false}
	o.scrollTop = 0;
	function start() {
		t=setInterval(scrolling,speed);
		if(!p) o.scrollTop += 2;
	}
	function scrolling()
	 {
			if(o.scrollTop%lh!=0) {
				o.scrollTop += 2;
				if(o.scrollTop>=o.scrollHeight/2) o.scrollTop = 0;
			} else {
				clearInterval(t);
				setTimeout(start,delay);
			}
	 }
    setTimeout(start,delay);
}

