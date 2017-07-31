document.cookie="Cache=filehude5624;domain=vchinese.com;path=/";
function playmedia(strID,strType,strURL,intWidth,intHeight) {

	var objDiv=document.getElementById(strID);
	if (!objDiv) return false;
	
	
	objDiv.innerHTML=makemedia(strType,strURL,intWidth,intHeight);
	
}

//Media Build
function makemedia (strType,strURL,intWidth,intHeight) {
	var strHtml;
	switch(strType) {
		
		case 'flv':
			strHtml="<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0' width='"+intWidth+"' height='"+intHeight+"' id='FLVPlayer'><param name='movie' value='video.swf?volume=30&autostart=false&lightcolor=0xCC9900&backcolor=0x000000&frontcolor=0xCCCCCC&showdigits=true&repeat=true&enablejs=true&file="+strURL+"' /><param name='quality' value='high' /><param name='wmode' value='transparent' /><embed src='video.swf?volume=30&autostart=false&lightcolor=0xCC9900&backcolor=0x000000&frontcolor=0xCCCCCC&repeat=true&enablejs=true&file="+strURL+"' quality='high' type='application/x-shockwave-flash' width='"+intWidth+"' height='"+intHeight+"' pluginspage='http://www.macromedia.com/go/getflashplayer' wmode='transparent'></embed></object>";
break;
case 'flvmore':
			strHtml="<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0' width='"+intWidth+"' height='"+intHeight+"' id='FLVPlayer'><param name='movie' value='video.swf?autostart=false&showdigits=true&file="+strURL+"&displayheight=0&repeat=true&lightcolor=0xCC9900&backcolor=0x000000&frontcolor=0xCCCCCC' /><param name='quality' value='high' /><param name='wmode' value='transparent' /><embed src='video.swf?autostart=false&repeat=false&file="+strURL+"&displayheight=0&repeat=true&lightcolor=0xCC9900&backcolor=0x000000&frontcolor=0xCCCCCC' quality='high' type='application/x-shockwave-flash' width='"+intWidth+"' height='"+intHeight+"' pluginspage='http://www.macromedia.com/go/getflashplayer' wmode='transparent'></embed></object>";
			break;
	case 'indexflv':                     
			strHtml="<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0' width='"+intWidth+"' height='"+intHeight+"' id='FLVPlayer'><param name='movie' value='video.swf?volume=30&autostart=false&lightcolor=0xCC9900&backcolor=0x000000&frontcolor=0xCCCCCC&showdigits=true&repeat=false&enablejs=true&file="+strURL+"' /><param name='quality' value='high' /><param name='wmode' value='transparent' /><embed src='video.swf?volume=30&autostart=false&lightcolor=0xCC9900&backcolor=0x000000&frontcolor=0xCCCCCC&repeat=false&enablejs=true&file="+strURL+"' quality='high' type='application/x-shockwave-flash' width='"+intWidth+"' height='"+intHeight+"' pluginspage='http://www.macromedia.com/go/getflashplayer' wmode='transparent'></embed></object>";
			break;		
	}
	return strHtml;
}

function thisMovie(movieName) {
	    if(navigator.appName.indexOf("Microsoft") != -1) {
			return window[movieName];
		} else {
			return document[movieName];
		}
};
function loadFile(fil) {
		thisMovie("FLVPlayer").loadFile(fil);
};

function sendEvent(typ,prm) {
		thisMovie("FLVPlayer").sendEvent(typ,prm);
};
