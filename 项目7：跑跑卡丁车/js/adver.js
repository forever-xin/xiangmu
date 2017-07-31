





//开头加;号是防止前一个js末行代码未加;结束
;var _ivyIDs="";
var _tmpIvyIDs="";
var _cntUrl="";
var _state_=0;
var _count_=1;
var __lock__ =0;
var _ivySubmitPage="http://ivy.pconline.com.cn/adpuba/show2?channel=inline&id=";
function _addIvyID(para_loc_ad){
	if(_tmpIvyIDs.indexOf(para_loc_ad+";")>-1){
		return;
	}

	_tmpIvyIDs = _tmpIvyIDs + para_loc_ad + ";";
	_ivyIDs = _ivyIDs + para_loc_ad + ";";
}
function _delIvyID(para_loc_ad){
	if(para_loc_ad != null && para_loc_ad.length>0 && para_loc_ad.indexOf("_")>0){
		if(_tmpIvyIDs.indexOf(para_loc_ad+";")>-1){
			_tmpIvyIDs = _tmpIvyIDs.replace(para_loc_ad+";", "");
		}
		if(_ivyIDs.indexOf(para_loc_ad+";")>-1){
			_ivyIDs = _ivyIDs.replace(para_loc_ad+";", "");
		}
	}
}
function _submitIvyID_impl(){
  __lock__ = 1;
  if (_ivyIDs && _ivyIDs != ""){
    var _ivyIDssend = _ivyIDs;
    _ivyIDs = "";
    try{
       var i2 = document.createElement("script");
       if(i2){
	  var ivydiv = document.getElementById("ivy_div");
	  if(!ivydiv){
	      //var bodys = document.getElementsByTagName("body");
	      //ivydiv = bodys[0];
              ivydiv   =   document.createElement("div");
              ivydiv.id= "ivy_div";
              ivydiv.style.display   =   "none";
              document.body.appendChild(ivydiv);
	  }

	  if (!ivydiv){
    	      try{
                 var i2 = new Image(1,1);
                 i2.src = _ivySubmitPage + _ivyIDssend;
                 i2.onload=function() { _uVoid(); }
              }catch(err0){_addIvyID(_ivyIDssend);}
	  }else{
    	      ivydiv.appendChild(i2);
	      var page = _ivySubmitPage + _ivyIDssend + "&state=" + _state_ + "&count=" + _count_;
	      i2.src = page;
          }
       }
    }catch(err){
        try{
	   var i2 = new Image(1,1);
           i2.src = _ivySubmitPage + _ivyIDssend;
           i2.onload=function() { _uVoid(); }
        }catch(err1){
           _addIvyID(_ivyIDssend);
        }
    }
  }
  if (_cntUrl && _cntUrl != ""){
    var i3 = new Image(1,1);
    i3.src = _cntUrl;
    i3.onload=function() { _uVoid(); }
    _cntUrl ="";
  }
  __lock__ = 0;
}
function _uVoid() { return; }
function _ivyRandom(size){
  try{
    hi_now = new Date();
    hi_id= hi_now.getSeconds() % size;
    return hi_id;
  }catch(err) {
    return 0;
  }
}
function _submitIvyID(){
   if(__lock__!=0){
      window.setTimeout(_submitIvyID,3000);
      return;
   }
   _state_ = 0;
   _count_ = 1;
   _submitIvyID_impl();
}
function _submitIvyID2(){
   if(__lock__!=0){
      window.setTimeout(_submitIvyID2,3000);
      return;
   }
    _state_ = 1;
   _count_ = 1;
   _submitIvyID_impl();
}
function _submitIvyID3(){
   if(__lock__!=0){
      window.setTimeout(_submitIvyID3,3000);
      return;
   }
   _state_ = 0;
   _count_ = 2;
   _submitIvyID_impl();
}
window.onbeforeunload = _submitIvyID2;

var userAgent = navigator.userAgent.toLowerCase();

if(/msie/.test(userAgent) && !/opera/.test(userAgent)){
    document.onreadystatechange = function(){
      if (document.readyState == "complete"){
     	 _submitIvyID3();
      }
    };
}else if(/opera/.test(userAgent) ||/mozilla/.test(userAgent)){
    document.addEventListener( "DOMContentLoaded", _submitIvyID3 , false );
}

function document_write(s) { document.write(s); }
function document_writeln(s) { document.writeln(s); }

//add for show3
var _IVY_AD_MAP_ = new Array();
function struct_IVY_AD_MAP(key, value){

  this.key = key;
  this.value = value;

}

function setLocationAd(key, value){

  for (var i = 0; i < this._IVY_AD_MAP_.length; i++)
  {
    if ( this._IVY_AD_MAP_[i].key === key )
    {
      this._IVY_AD_MAP_[i].value = value;
      return;
    }
  }

  this._IVY_AD_MAP_[this._IVY_AD_MAP_.length] = new struct_IVY_AD_MAP(key, value);

}

function getLocationAd(key,pex)
{
   var tmp = new Array();
   var obj = new Array();
  for (var i = 0; i < this._IVY_AD_MAP_.length; i++)
  {
    if ( this._IVY_AD_MAP_[i].key === key )
    {
      tmp = this._IVY_AD_MAP_[i].value;
	  break;
    }
  }
  if(tmp != null && tmp.length>0){
	var level = tmp[0].level;
	for(var i=0;i<tmp.length;i++){
		if(pex != null && pex>0){
			if(pex>obj.length){
				obj[obj.length] = tmp[i];
				_addIvyID(tmp[i].locationId + "_" + tmp[i].adId);
			}
		}else{
			if(level>tmp[i].level)break;
			obj[obj.length] = tmp[i];
			_addIvyID(tmp[i].locationId + "_" + tmp[i].adId);
			if(level<2)break;
		}
	}
  }
  return obj;
}

//<<<<<<<<<<<<<<< added by Sun Bin <<<<<<<<<<<<<<<<<<
//需要时才读入js，第一个参数用于检测需要的功能是否已存在。示范： needJS(window.PicFocus, 'http://www1.pconline.com.cn/script/focusImg.js', function(){ ... new PicFocus(...) ... };
function needJS(fn,src,callback) {
    if(typeof callback == 'undefined' || callback == null) callback = function(){};
    if(typeof fn != 'undefined' && fn != null && fn != '') return callback();
    var status = typeof _needJS_ == 'undefined' ? _needJS_ = {loaded:[],loading:[]} : _needJS_;

    for(var i=0; i<status.loaded.length; i++) {
        if(status.loaded[i] == src) return callback();
    }

    function idx(src) { //供后面的代码调用
        for(var i=0;i<status.loading.length;i++) if(status.loading[i].src==src) return i;
    }

    var loading = status.loading[idx(src)];
    if(loading != null) {
        loading.callbacks.push(callback);
        return;
    }

    status.loading.push(loading = {src:src,callbacks:[callback]});
    var js = document.createElement('script');
    js.src = src;
    js.onload = js.onreadystatechange = function() {
        if(typeof js.readyState == 'undefined' || js.readyState == 'loaded' || js.readyState == 'complete') {
            status.loaded.push(loading.src);
            var callbacks = loading.callbacks;
            status.loading.splice(idx(src),1);
            for(var i = 0; i < callbacks.length; i++) {
                loading.callbacks[i]();
            }
        }
    }
    document.getElementsByTagName('head')[0].appendChild(js);
} //needJS()

/** 常规广告，无特殊效果控制。key为位置标识, placeHolderId为占位标记，可不给出 */
function ivyHTML4PicOrFlash(SRC,URL) {
    if(!SRC.match(/^http:/i)) return '';
    if(!SRC.match(/\.swf/i)) { //pic
        return '<a target=_blank href='+escape(URL)+'><img border=0 src='+SRC+'></a>';
    }

    var w = 1*SRC.replace(/^.*#(\d+)x(\d+).*$|^.*$/,'$1'); if(w<1)w=950;
    var h = 1*SRC.replace(/^.*#(\d+)x(\d+).*$|^.*$/,'$2'); if(h<1)h=90;
    var trans = !!SRC.match(/#transparent/i);
    SRC = SRC.replace(/#.*$/,'');

    return '<OBJECT classid=clsid:D27CDB6E-AE6D-11cf-96B8-444553540000 WIDTH='+w+' HEIGHT='+h+'><PARAM NAME=movie VALUE='+SRC+'><EMBED src='+SRC+' WIDTH='+w+' HEIGHT='+h+' TYPE=application/x-shockwave-flash PLUGINSPAGE=http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash></EMBED>'+
    (trans?'<param name=wmode value=transparent>':'<param name=wmode value=opaque>')
    +'</OBJECT>';
}

function ivyNormal(key,placeHolderId) {
    var obj = getLocationAd(key);
    for(var i = 0; i < obj.length; i++) {
        var ad = obj[i];
        if(ad.src.match(/\.(jpg|gif|png|jpeg)(#.*)?$/i)) //图片
            document.write("<a class='ad' href='"+ad.link+"' target='_blank'><img border='0' src='"+ad.src+"'/></a>");
        else if(ad.src.match(/\.(swf)(#.*)?$/i)) { //flash
            if(typeof placeHolderId=='undefined' || placeHolderId=='' || placeHolderId==null) {
                placeHolderId = 'placeHolder'+new Date().getTime()+Math.floor(10000*Math.random());
            document.write("<a class='ad'"+(ad.link!=""?" href='"+ad.link+"'":"")+" id='"+placeHolderId+"'></a>");
            }
            var w = ad.src.replace(/^.*#(\d+)x(\d+).*$|^.*$/,'$1');
            var h = ad.src.replace(/^.*#(\d+)x(\d+).*$|^.*$/,'$2');
            if(w=='')w='100%'; if(h=='')h='90';
            document.getElementById(placeHolderId).innerHTML=("<embed src='"+ad.src+"' width='"+w+"' height='"+h+"'/>");

        } else  //普通文本
            document.write("<a class='ad' href='"+ad.link+"' target='_blank'>"+ad.src+"</a>");
    }
}
//>>>>>>>> added by Sun Bin >>>>>>>>>>>>

function showIvyViaJs(locationId){
	var _f=undefined;
	var _fconv = locationId.replace(/\./g,"_");
	try{
		eval("_f = " + _fconv);
		if (_f!=undefined){
			_f();
		}else{
			//alert('no the function.');
			//handle of not ad found
		}
	}catch(e){
		//handle of not ad found
	}
}

/** 关键字广告保存的数组列表和回调函数 add by yjx **/
//关键字广告列表
var ivyAdList = new Array();
//关键字广告内容，key-关键字，content-广告内容，href-点击链接，ivyPara-计数参数，showCount-关键字显示次数，linkCss-链接样式
function IvyKeyword(key, content, href, ivyPara, showCount, linkCss){
	this.key = key;
	this.content = content;
	this.href = href;
	this.ivyPara = ivyPara;
	this.showCount = showCount;
	this.tmpCount = 0;
	this.linkCss = linkCss;
}

//提供给程序的回调JS函数
function showKeyWorkAd(key, content, href, ivyPara, showCount, linkCss){
	ivyAdList[ivyAdList.length] = new IvyKeyword(key, content, href, ivyPara, showCount, linkCss);
}

;//jquery1.2.6, bgiframe, cookie, hoverIntent
(function(){var u=window.jQuery,_$=window.$;var v=window.jQuery=window.$=function(a,b){return new v.fn.init(a,b)};var w=/^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/,isSimple=/^.[^:#\[\.]*$/,undefined;v.fn=v.prototype={init:function(a,b){a=a||document;if(a.nodeType){this[0]=a;this.length=1;return this}if(typeof a=="string"){var c=w.exec(a);if(c&&(c[1]||!b)){if(c[1])a=v.clean([c[1]],b);else{var d=document.getElementById(c[3]);if(d){if(d.id!=c[3])return v().find(a);return v(d)}a=[]}}else return v(b).find(a)}else if(v.isFunction(a))return v(document)[v.fn.ready?"ready":"load"](a);return this.setArray(v.makeArray(a))},jquery:"1.2.6",size:function(){return this.length},length:0,get:function(a){return a==undefined?v.makeArray(this):this[a]},pushStack:function(a){var b=v(a);b.prevObject=this;return b},setArray:function(a){this.length=0;Array.prototype.push.apply(this,a);return this},each:function(a,b){return v.each(this,a,b)},index:function(a){var b=-1;return v.inArray(a&&a.jquery?a[0]:a,this)},attr:function(a,b,c){var d=a;if(a.constructor==String)if(b===undefined)return this[0]&&v[c||"attr"](this[0],a);else{d={};d[a]=b}return this.each(function(i){for(a in d)v.attr(c?this.style:this,a,v.prop(this,d[a],c,i,a))})},css:function(a,b){if((a=='width'||a=='height')&&parseFloat(b)<0)b=undefined;return this.attr(a,b,"curCSS")},text:function(a){if(typeof a!="object"&&a!=null)return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(a));var b="";v.each(a||this,function(){v.each(this.childNodes,function(){if(this.nodeType!=8)b+=this.nodeType!=1?this.nodeValue:v.fn.text([this])})});return b},wrapAll:function(b){if(this[0])v(b,this[0].ownerDocument).clone().insertBefore(this[0]).map(function(){var a=this;while(a.firstChild)a=a.firstChild;return a}).append(this);return this},wrapInner:function(a){return this.each(function(){v(this).contents().wrapAll(a)})},wrap:function(a){return this.each(function(){v(this).wrapAll(a)})},append:function(){return this.domManip(arguments,true,false,function(a){if(this.nodeType==1)this.appendChild(a)})},prepend:function(){return this.domManip(arguments,true,true,function(a){if(this.nodeType==1)this.insertBefore(a,this.firstChild)})},before:function(){return this.domManip(arguments,false,false,function(a){this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,false,true,function(a){this.parentNode.insertBefore(a,this.nextSibling)})},end:function(){return this.prevObject||v([])},find:function(b){var c=v.map(this,function(a){return v.find(b,a)});return this.pushStack(/[^+>] [^+>]/.test(b)||b.indexOf("..")>-1?v.unique(c):c)},clone:function(d){var e=this.map(function(){if(v.browser.msie&&!v.isXMLDoc(this)){var a=this.cloneNode(true),container=document.createElement("div");container.appendChild(a);return v.clean([container.innerHTML])[0]}else return this.cloneNode(true)});var f=e.find("*").andSelf().each(function(){if(this[x]!=undefined)this[x]=null});if(d===true)this.find("*").andSelf().each(function(i){if(this.nodeType==3)return;var a=v.data(this,"events");for(var b in a)for(var c in a[b])v.event.add(f[i],b,a[b][c],a[b][c].data)});return e},filter:function(b){return this.pushStack(v.isFunction(b)&&v.grep(this,function(a,i){return b.call(a,i)})||v.multiFilter(b,this))},not:function(a){if(a.constructor==String)if(isSimple.test(a))return this.pushStack(v.multiFilter(a,this,true));else a=v.multiFilter(a,this);var b=a.length&&a[a.length-1]!==undefined&&!a.nodeType;return this.filter(function(){return b?v.inArray(this,a)<0:this!=a})},add:function(a){return this.pushStack(v.unique(v.merge(this.get(),typeof a=='string'?v(a):v.makeArray(a))))},is:function(a){return!!a&&v.multiFilter(a,this).length>0},hasClass:function(a){return this.is("."+a)},val:function(b){if(b==undefined){if(this.length){var c=this[0];if(v.nodeName(c,"select")){var d=c.selectedIndex,values=[],options=c.options,one=c.type=="select-one";if(d<0)return null;for(var i=one?d:0,max=one?d+1:options.length;i<max;i++){var e=options[i];if(e.selected){b=v.browser.msie&&!e.attributes.value.specified?e.text:e.value;if(one)return b;values.push(b)}}return values}else return(this[0].value||"").replace(/\r/g,"")}return undefined}if(b.constructor==Number)b+='';return this.each(function(){if(this.nodeType!=1)return;if(b.constructor==Array&&/radio|checkbox/.test(this.type))this.checked=(v.inArray(this.value,b)>=0||v.inArray(this.name,b)>=0);else if(v.nodeName(this,"select")){var a=v.makeArray(b);v("option",this).each(function(){this.selected=(v.inArray(this.value,a)>=0||v.inArray(this.text,a)>=0)});if(!a.length)this.selectedIndex=-1}else this.value=b})},html:function(a){return a==undefined?(this[0]?this[0].innerHTML:null):this.empty().append(a)},replaceWith:function(a){return this.after(a).remove()},eq:function(i){return this.slice(i,i+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments))},map:function(b){return this.pushStack(v.map(this,function(a,i){return b.call(a,i,a)}))},andSelf:function(){return this.add(this.prevObject)},data:function(a,b){var c=a.split(".");c[1]=c[1]?"."+c[1]:"";if(b===undefined){var d=this.triggerHandler("getData"+c[1]+"!",[c[0]]);if(d===undefined&&this.length)d=v.data(this[0],a);return d===undefined&&c[1]?this.data(c[0]):d}else return this.trigger("setData"+c[1]+"!",[c[0],b]).each(function(){v.data(this,a,b)})},removeData:function(a){return this.each(function(){v.removeData(this,a)})},domManip:function(d,e,f,g){var h=this.length>1,elems;return this.each(function(){if(!elems){elems=v.clean(d,this.ownerDocument);if(f)elems.reverse()}var b=this;if(e&&v.nodeName(this,"table")&&v.nodeName(elems[0],"tr"))b=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"));var c=v([]);v.each(elems,function(){var a=h?v(this).clone(true)[0]:this;if(v.nodeName(a,"script"))c=c.add(a);else{if(a.nodeType==1)c=c.add(v("script",a).remove());g.call(b,a)}});c.each(evalScript)})}};v.fn.init.prototype=v.fn;function evalScript(i,a){if(a.src)v.ajax({url:a.src,async:false,dataType:"script"});else v.globalEval(a.text||a.textContent||a.innerHTML||"");if(a.parentNode)a.parentNode.removeChild(a)}function now(){return+new Date}v.extend=v.fn.extend=function(){var a=arguments[0]||{},i=1,length=arguments.length,deep=false,options;if(a.constructor==Boolean){deep=a;a=arguments[1]||{};i=2}if(typeof a!="object"&&typeof a!="function")a={};if(length==i){a=this;--i}for(;i<length;i++)if((options=arguments[i])!=null)for(var b in options){var c=a[b],copy=options[b];if(a===copy)continue;if(deep&&copy&&typeof copy=="object"&&!copy.nodeType)a[b]=v.extend(deep,c||(copy.length!=null?[]:{}),copy);else if(copy!==undefined)a[b]=copy}return a};var x="jQuery"+now(),uuid=0,windowData={},exclude=/z-?index|font-?weight|opacity|zoom|line-?height/i,defaultView=document.defaultView||{};v.extend({noConflict:function(a){window.$=_$;if(a)window.jQuery=u;return v},isFunction:function(a){return!!a&&typeof a!="string"&&!a.nodeName&&a.constructor!=Array&&/^[\s[]?function/.test(a+"")},isXMLDoc:function(a){return a.documentElement&&!a.body||a.tagName&&a.ownerDocument&&!a.ownerDocument.body},globalEval:function(a){a=v.trim(a);if(a){var b=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");script.type="text/javascript";if(v.browser.msie)script.text=a;else script.appendChild(document.createTextNode(a));b.insertBefore(script,b.firstChild);b.removeChild(script)}},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()==b.toUpperCase()},cache:{},data:function(a,b,c){a=a==window?windowData:a;var d=a[x];if(!d)d=a[x]=++uuid;if(b&&!v.cache[d])v.cache[d]={};if(c!==undefined)v.cache[d][b]=c;return b?v.cache[d][b]:d},removeData:function(a,b){a=a==window?windowData:a;var c=a[x];if(b){if(v.cache[c]){delete v.cache[c][b];b="";for(b in v.cache[c])break;if(!b)v.removeData(a)}}else{try{delete a[x]}catch(e){if(a.removeAttribute)a.removeAttribute(x)}delete v.cache[c]}},each:function(a,b,c){var d,i=0,length=a.length;if(c){if(length==undefined){for(d in a)if(b.apply(a[d],c)===false)break}else for(;i<length;)if(b.apply(a[i++],c)===false)break}else{if(length==undefined){for(d in a)if(b.call(a[d],d,a[d])===false)break}else for(var e=a[0];i<length&&b.call(e,i,e)!==false;e=a[++i]){}}return a},prop:function(a,b,c,i,d){if(v.isFunction(b))b=b.call(a,i);return b&&b.constructor==Number&&c=="curCSS"&&!exclude.test(d)?b+"px":b},className:{add:function(b,c){v.each((c||"").split(/\s+/),function(i,a){if(b.nodeType==1&&!v.className.has(b.className,a))b.className+=(b.className?" ":"")+a})},remove:function(b,c){if(b.nodeType==1)b.className=c!=undefined?v.grep(b.className.split(/\s+/),function(a){return!v.className.has(c,a)}).join(" "):""},has:function(a,b){return v.inArray(b,(a.className||a).toString().split(/\s+/))>-1}},swap:function(a,b,c){var d={};for(var e in b){d[e]=a.style[e];a.style[e]=b[e]}c.call(a);for(var e in b)a.style[e]=d[e]},css:function(b,c,d){if(c=="width"||c=="height"){var e,props={position:"absolute",visibility:"hidden",display:"block"},which=c=="width"?["Left","Right"]:["Top","Bottom"];function getWH(){e=c=="width"?b.offsetWidth:b.offsetHeight;var a=0,border=0;v.each(which,function(){a+=parseFloat(v.curCSS(b,"padding"+this,true))||0;border+=parseFloat(v.curCSS(b,"border"+this+"Width",true))||0});e-=Math.round(a+border)}if(v(b).is(":visible"))getWH();else v.swap(b,props,getWH);return Math.max(0,e)}return v.curCSS(b,c,d)},curCSS:function(c,d,e){var f,style=c.style;function color(a){if(!v.browser.safari)return false;var b=defaultView.getComputedStyle(a,null);return!b||b.getPropertyValue("color")==""}if(d=="opacity"&&v.browser.msie){f=v.attr(style,"opacity");return f==""?"1":f}if(v.browser.opera&&d=="display"){var g=style.outline;style.outline="0 solid black";style.outline=g}if(d.match(/float/i))d=A;if(!e&&style&&style[d])f=style[d];else if(defaultView.getComputedStyle){if(d.match(/float/i))d="float";d=d.replace(/([A-Z])/g,"-$1").toLowerCase();var h=defaultView.getComputedStyle(c,null);if(h&&!color(c))f=h.getPropertyValue(d);else{var j=[],stack=[],a=c,i=0;for(;a&&color(a);a=a.parentNode)stack.unshift(a);for(;i<stack.length;i++)if(color(stack[i])){j[i]=stack[i].style.display;stack[i].style.display="block"}f=d=="display"&&j[stack.length-1]!=null?"none":(h&&h.getPropertyValue(d))||"";for(i=0;i<j.length;i++)if(j[i]!=null)stack[i].style.display=j[i]}if(d=="opacity"&&f=="")f="1"}else if(c.currentStyle){var k=d.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()});f=c.currentStyle[d]||c.currentStyle[k];if(!/^\d+(px)?$/i.test(f)&&/^\d/.test(f)){var l=style.left,rsLeft=c.runtimeStyle.left;c.runtimeStyle.left=c.currentStyle.left;style.left=f||0;f=style.pixelLeft+"px";style.left=l;c.runtimeStyle.left=rsLeft}}return f},clean:function(h,k){var l=[];k=k||document;if(typeof k.createElement=='undefined')k=k.ownerDocument||k[0]&&k[0].ownerDocument||document;v.each(h,function(i,d){if(!d)return;if(d.constructor==Number)d+='';if(typeof d=="string"){d=d.replace(/(<(\w+)[^>]*?)\/>/g,function(a,b,c){return c.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?a:b+"></"+c+">"});var e=v.trim(d).toLowerCase(),div=k.createElement("div");var f=!e.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!e.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||e.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!e.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!e.indexOf("<td")||!e.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!e.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||v.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];div.innerHTML=f[1]+d+f[2];while(f[0]--)div=div.lastChild;if(v.browser.msie){var g=!e.indexOf("<table")&&e.indexOf("<tbody")<0?div.firstChild&&div.firstChild.childNodes:f[1]=="<table>"&&e.indexOf("<tbody")<0?div.childNodes:[];for(var j=g.length-1;j>=0;--j)if(v.nodeName(g[j],"tbody")&&!g[j].childNodes.length)g[j].parentNode.removeChild(g[j]);if(/^\s/.test(d))div.insertBefore(k.createTextNode(d.match(/^\s*/)[0]),div.firstChild)}d=v.makeArray(div.childNodes)}if(d.length===0&&(!v.nodeName(d,"form")&&!v.nodeName(d,"select")))return;if(d[0]==undefined||v.nodeName(d,"form")||d.options)l.push(d);else l=v.merge(l,d)});return l},attr:function(c,d,e){if(!c||c.nodeType==3||c.nodeType==8)return undefined;var f=!v.isXMLDoc(c),set=e!==undefined,msie=v.browser.msie;d=f&&v.props[d]||d;if(c.tagName){var g=/href|src|style/.test(d);if(d=="selected"&&v.browser.safari)c.parentNode.selectedIndex;if(d in c&&f&&!g){if(set){if(d=="type"&&v.nodeName(c,"input")&&c.parentNode)throw"type property can't be changed";c[d]=e}if(v.nodeName(c,"form")&&c.getAttributeNode(d))return c.getAttributeNode(d).nodeValue;return c[d]}if(msie&&f&&d=="style")return v.attr(c.style,"cssText",e);if(set)c.setAttribute(d,""+e);var h=msie&&f&&g?c.getAttribute(d,2):c.getAttribute(d);return h===null?undefined:h}if(msie&&d=="opacity"){if(set){c.zoom=1;c.filter=(c.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(e)+''=="NaN"?"":"alpha(opacity="+e*100+")")}return c.filter&&c.filter.indexOf("opacity=")>=0?(parseFloat(c.filter.match(/opacity=([^)]*)/)[1])/100)+'':""}d=d.replace(/-([a-z])/ig,function(a,b){return b.toUpperCase()});if(set)c[d]=e;return c[d]},trim:function(a){return(a||"").replace(/^\s+|\s+$/g,"")},makeArray:function(a){var b=[];if(a!=null){var i=a.length;if(i==null||a.split||a.setInterval||a.call)b[0]=a;else while(i)b[--i]=a[i]}return b},inArray:function(a,b){for(var i=0,length=b.length;i<length;i++)if(b[i]===a)return i;return-1},merge:function(a,b){var i=0,elem,pos=a.length;if(v.browser.msie){while(elem=b[i++])if(elem.nodeType!=8)a[pos++]=elem}else while(elem=b[i++])a[pos++]=elem;return a},unique:function(a){var b=[],done={};try{for(var i=0,length=a.length;i<length;i++){var c=v.data(a[i]);if(!done[c]){done[c]=true;b.push(a[i])}}}catch(e){b=a}return b},grep:function(a,b,c){var d=[];for(var i=0,length=a.length;i<length;i++)if(!c!=!b(a[i],i))d.push(a[i]);return d},map:function(a,b){var c=[];for(var i=0,length=a.length;i<length;i++){var d=b(a[i],i);if(d!=null)c[c.length]=d}return c.concat.apply([],c)}});var y=navigator.userAgent.toLowerCase();v.browser={version:(y.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(y),opera:/opera/.test(y),msie:/msie/.test(y)&&!/opera/.test(y),mozilla:/mozilla/.test(y)&&!/(compatible|webkit)/.test(y)};var A=v.browser.msie?"styleFloat":"cssFloat";v.extend({boxModel:!v.browser.msie||document.compatMode=="CSS1Compat",props:{"for":"htmlFor","class":"className","float":A,cssFloat:A,styleFloat:A,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing"}});v.each({parent:function(a){return a.parentNode},parents:function(a){return v.dir(a,"parentNode")},next:function(a){return v.nth(a,2,"nextSibling")},prev:function(a){return v.nth(a,2,"previousSibling")},nextAll:function(a){return v.dir(a,"nextSibling")},prevAll:function(a){return v.dir(a,"previousSibling")},siblings:function(a){return v.sibling(a.parentNode.firstChild,a)},children:function(a){return v.sibling(a.firstChild)},contents:function(a){return v.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:v.makeArray(a.childNodes)}},function(c,d){v.fn[c]=function(a){var b=v.map(this,d);if(a&&typeof a=="string")b=v.multiFilter(a,b);return this.pushStack(v.unique(b))}});v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(b,c){v.fn[b]=function(){var a=arguments;return this.each(function(){for(var i=0,length=a.length;i<length;i++)v(a[i])[c](this)})}});v.each({removeAttr:function(a){v.attr(this,a,"");if(this.nodeType==1)this.removeAttribute(a)},addClass:function(a){v.className.add(this,a)},removeClass:function(a){v.className.remove(this,a)},toggleClass:function(a){v.className[v.className.has(this,a)?"remove":"add"](this,a)},remove:function(a){if(!a||v.filter(a,[this]).r.length){v("*",this).add(this).each(function(){v.event.remove(this);v.removeData(this)});if(this.parentNode)this.parentNode.removeChild(this)}},empty:function(){v(">*",this).remove();while(this.firstChild)this.removeChild(this.firstChild)}},function(a,b){v.fn[a]=function(){return this.each(b,arguments)}});v.each(["Height","Width"],function(i,b){var c=b.toLowerCase();v.fn[c]=function(a){return this[0]==window?v.browser.opera&&document.body["client"+b]||v.browser.safari&&window["inner"+b]||document.compatMode=="CSS1Compat"&&document.documentElement["client"+b]||document.body["client"+b]:this[0]==document?Math.max(Math.max(document.body["scroll"+b],document.documentElement["scroll"+b]),Math.max(document.body["offset"+b],document.documentElement["offset"+b])):a==undefined?(this.length?v.css(this[0],c):null):this.css(c,a.constructor==String?a:a+"px")}});function num(a,b){return a[0]&&parseInt(v.curCSS(a[0],b,true),10)||0}var B=v.browser.safari&&parseInt(v.browser.version)<417?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",quickChild=new RegExp("^>\\s*("+B+"+)"),quickID=new RegExp("^("+B+"+)(#)("+B+"+)"),quickClass=new RegExp("^([#.]?)("+B+"*)");v.extend({expr:{"":function(a,i,m){return m[2]=="*"||v.nodeName(a,m[2])},"#":function(a,i,m){return a.getAttribute("id")==m[2]},":":{lt:function(a,i,m){return i<m[3]-0},gt:function(a,i,m){return i>m[3]-0},nth:function(a,i,m){return m[3]-0==i},eq:function(a,i,m){return m[3]-0==i},first:function(a,i){return i==0},last:function(a,i,m,r){return i==r.length-1},even:function(a,i){return i%2==0},odd:function(a,i){return i%2},"first-child":function(a){return a.parentNode.getElementsByTagName("*")[0]==a},"last-child":function(a){return v.nth(a.parentNode.lastChild,1,"previousSibling")==a},"only-child":function(a){return!v.nth(a.parentNode.lastChild,2,"previousSibling")},parent:function(a){return a.firstChild},empty:function(a){return!a.firstChild},contains:function(a,i,m){return(a.textContent||a.innerText||v(a).text()||"").indexOf(m[3])>=0},visible:function(a){return"hidden"!=a.type&&v.css(a,"display")!="none"&&v.css(a,"visibility")!="hidden"},hidden:function(a){return"hidden"==a.type||v.css(a,"display")=="none"||v.css(a,"visibility")=="hidden"},enabled:function(a){return!a.disabled},disabled:function(a){return a.disabled},checked:function(a){return a.checked},selected:function(a){return a.selected||v.attr(a,"selected")},text:function(a){return"text"==a.type},radio:function(a){return"radio"==a.type},checkbox:function(a){return"checkbox"==a.type},file:function(a){return"file"==a.type},password:function(a){return"password"==a.type},submit:function(a){return"submit"==a.type},image:function(a){return"image"==a.type},reset:function(a){return"reset"==a.type},button:function(a){return"button"==a.type||v.nodeName(a,"button")},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},has:function(a,i,m){return v.find(m[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},animated:function(a){return v.grep(v.timers,function(b){return a==b.elem}).length}}},parse:[/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/,/^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/,new RegExp("^([:.#]*)("+B+"+)")],multiFilter:function(a,b,c){var d,cur=[];while(a&&a!=d){d=a;var f=v.filter(a,b,c);a=f.t.replace(/^\s*,\s*/,"");cur=c?b=f.r:v.merge(cur,f.r)}return cur},find:function(t,a){if(typeof t!="string")return[t];if(a&&a.nodeType!=1&&a.nodeType!=9)return[];a=a||document;var b=[a],done=[],last,nodeName;while(t&&last!=t){var r=[];last=t;t=v.trim(t);var d=false,re=quickChild,m=re.exec(t);if(m){nodeName=m[1].toUpperCase();for(var i=0;b[i];i++)for(var c=b[i].firstChild;c;c=c.nextSibling)if(c.nodeType==1&&(nodeName=="*"||c.nodeName.toUpperCase()==nodeName))r.push(c);b=r;t=t.replace(re,"");if(t.indexOf(" ")==0)continue;d=true}else{re=/^([>+~])\s*(\w*)/i;if((m=re.exec(t))!=null){r=[];var e={};nodeName=m[2].toUpperCase();m=m[1];for(var j=0,rl=b.length;j<rl;j++){var n=m=="~"||m=="+"?b[j].nextSibling:b[j].firstChild;for(;n;n=n.nextSibling)if(n.nodeType==1){var f=v.data(n);if(m=="~"&&e[f])break;if(!nodeName||n.nodeName.toUpperCase()==nodeName){if(m=="~")e[f]=true;r.push(n)}if(m=="+")break}}b=r;t=v.trim(t.replace(re,""));d=true}}if(t&&!d){if(!t.indexOf(",")){if(a==b[0])b.shift();done=v.merge(done,b);r=b=[a];t=" "+t.substr(1,t.length)}else{var g=quickID;var m=g.exec(t);if(m){m=[0,m[2],m[3],m[1]]}else{g=quickClass;m=g.exec(t)}m[2]=m[2].replace(/\\/g,"");var h=b[b.length-1];if(m[1]=="#"&&h&&h.getElementById&&!v.isXMLDoc(h)){var k=h.getElementById(m[2]);if((v.browser.msie||v.browser.opera)&&k&&typeof k.id=="string"&&k.id!=m[2])k=v('[@id="'+m[2]+'"]',h)[0];b=r=k&&(!m[3]||v.nodeName(k,m[3]))?[k]:[]}else{for(var i=0;b[i];i++){var l=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];if(l=="*"&&b[i].nodeName.toLowerCase()=="object")l="param";r=v.merge(r,b[i].getElementsByTagName(l))}if(m[1]==".")r=v.classFilter(r,m[2]);if(m[1]=="#"){var o=[];for(var i=0;r[i];i++)if(r[i].getAttribute("id")==m[2]){o=[r[i]];break}r=o}b=r}t=t.replace(g,"")}}if(t){var p=v.filter(t,r);b=r=p.r;t=v.trim(p.t)}}if(t)b=[];if(b&&a==b[0])b.shift();done=v.merge(done,b);return done},classFilter:function(r,m,a){m=" "+m+" ";var b=[];for(var i=0;r[i];i++){var c=(" "+r[i].className+" ").indexOf(m)>=0;if(!a&&c||a&&!c)b.push(r[i])}return b},filter:function(t,r,b){var d;while(t&&t!=d){d=t;var p=v.parse,m;for(var i=0;p[i];i++){m=p[i].exec(t);if(m){t=t.substring(m[0].length);m[2]=m[2].replace(/\\/g,"");break}}if(!m)break;if(m[1]==":"&&m[2]=="not")r=isSimple.test(m[3])?v.filter(m[3],r,true).r:v(r).not(m[3]);else if(m[1]==".")r=v.classFilter(r,m[2],b);else if(m[1]=="["){var e=[],type=m[3];for(var i=0,rl=r.length;i<rl;i++){var a=r[i],z=a[v.props[m[2]]||m[2]];if(z==null||/href|src|selected/.test(m[2]))z=v.attr(a,m[2])||'';if((type==""&&!!z||type=="="&&z==m[5]||type=="!="&&z!=m[5]||type=="^="&&z&&!z.indexOf(m[5])||type=="$="&&z.substr(z.length-m[5].length)==m[5]||(type=="*="||type=="~=")&&z.indexOf(m[5])>=0)^b)e.push(a)}r=e}else if(m[1]==":"&&m[2]=="nth-child"){var f={},e=[],test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3]=="even"&&"2n"||m[3]=="odd"&&"2n+1"||!/\D/.test(m[3])&&"0n+"+m[3]||m[3]),first=(test[1]+(test[2]||1))-0,d=test[3]-0;for(var i=0,rl=r.length;i<rl;i++){var g=r[i],parentNode=g.parentNode,id=v.data(parentNode);if(!f[id]){var c=1;for(var n=parentNode.firstChild;n;n=n.nextSibling)if(n.nodeType==1)n.nodeIndex=c++;f[id]=true}var h=false;if(first==0){if(g.nodeIndex==d)h=true}else if((g.nodeIndex-d)%first==0&&(g.nodeIndex-d)/first>=0)h=true;if(h^b)e.push(g)}r=e}else{var j=v.expr[m[1]];if(typeof j=="object")j=j[m[2]];if(typeof j=="string")j=eval("false||function(a,i){return "+j+";}");r=v.grep(r,function(a,i){return j(a,i,m,r)},b)}}return{r:r,t:t}},dir:function(a,b){var c=[],cur=a[b];while(cur&&cur!=document){if(cur.nodeType==1)c.push(cur);cur=cur[b]}return c},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType==1&&++e==b)break;return a},sibling:function(n,a){var r=[];for(;n;n=n.nextSibling){if(n.nodeType==1&&n!=a)r.push(n)}return r}});v.event={add:function(e,f,g,h){if(e.nodeType==3||e.nodeType==8)return;if(v.browser.msie&&e.setInterval)e=window;if(!g.guid)g.guid=this.guid++;if(h!=undefined){var i=g;g=this.proxy(i,function(){return i.apply(this,arguments)});g.data=h}var j=v.data(e,"events")||v.data(e,"events",{}),handle=v.data(e,"handle")||v.data(e,"handle",function(){if(typeof v!="undefined"&&!v.event.triggered)return v.event.handle.apply(arguments.callee.elem,arguments)});handle.elem=e;v.each(f.split(/\s+/),function(a,b){var c=b.split(".");b=c[0];g.type=c[1];var d=j[b];if(!d){d=j[b]={};if(!v.event.special[b]||v.event.special[b].setup.call(e)===false){if(e.addEventListener)e.addEventListener(b,handle,false);else if(e.attachEvent)e.attachEvent("on"+b,handle)}}d[g.guid]=g;v.event.global[b]=true});e=null},guid:1,global:{},remove:function(d,e,f){if(d.nodeType==3||d.nodeType==8)return;var g=v.data(d,"events"),ret,index;if(g){if(e==undefined||(typeof e=="string"&&e.charAt(0)=="."))for(var h in g)this.remove(d,h+(e||""));else{if(e.type){f=e.handler;e=e.type}v.each(e.split(/\s+/),function(a,b){var c=b.split(".");b=c[0];if(g[b]){if(f)delete g[b][f.guid];else for(f in g[b])if(!c[1]||g[b][f].type==c[1])delete g[b][f];for(ret in g[b])break;if(!ret){if(!v.event.special[b]||v.event.special[b].teardown.call(d)===false){if(d.removeEventListener)d.removeEventListener(b,v.data(d,"handle"),false);else if(d.detachEvent)d.detachEvent("on"+b,v.data(d,"handle"))}ret=null;delete g[b]}}})}for(ret in g)break;if(!ret){var i=v.data(d,"handle");if(i)i.elem=null;v.removeData(d,"events");v.removeData(d,"handle")}}},trigger:function(a,b,c,d,f){b=v.makeArray(b);if(a.indexOf("!")>=0){a=a.slice(0,-1);var g=true}if(!c){if(this.global[a])v("*").add([window,document]).trigger(a,b)}else{if(c.nodeType==3||c.nodeType==8)return undefined;var h,ret,fn=v.isFunction(c[a]||null),event=!b[0]||!b[0].preventDefault;if(event){b.unshift({type:a,target:c,preventDefault:function(){},stopPropagation:function(){},timeStamp:now()});b[0][x]=true}b[0].type=a;if(g)b[0].exclusive=true;var i=v.data(c,"handle");if(i)h=i.apply(c,b);if((!fn||(v.nodeName(c,'a')&&a=="click"))&&c["on"+a]&&c["on"+a].apply(c,b)===false)h=false;if(event)b.shift();if(f&&v.isFunction(f)){ret=f.apply(c,h==null?b:b.concat(h));if(ret!==undefined)h=ret}if(fn&&d!==false&&h!==false&&!(v.nodeName(c,'a')&&a=="click")){this.triggered=true;try{c[a]()}catch(e){}}this.triggered=false}return h},handle:function(a){var b,ret,namespace,all,handlers;a=arguments[0]=v.event.fix(a||window.event);namespace=a.type.split(".");a.type=namespace[0];namespace=namespace[1];all=!namespace&&!a.exclusive;handlers=(v.data(this,"events")||{})[a.type];for(var j in handlers){var c=handlers[j];if(all||c.type==namespace){a.handler=c;a.data=c.data;ret=c.apply(this,arguments);if(b!==false)b=ret;if(ret===false){a.preventDefault();a.stopPropagation()}}}return b},fix:function(a){if(a[x]==true)return a;var b=a;a={originalEvent:b};var c="altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view wheelDelta which".split(" ");for(var i=c.length;i;i--)a[c[i]]=b[c[i]];a[x]=true;a.preventDefault=function(){if(b.preventDefault)b.preventDefault();b.returnValue=false};a.stopPropagation=function(){if(b.stopPropagation)b.stopPropagation();b.cancelBubble=true};a.timeStamp=a.timeStamp||now();if(!a.target)a.target=a.srcElement||document;if(a.target.nodeType==3)a.target=a.target.parentNode;if(!a.relatedTarget&&a.fromElement)a.relatedTarget=a.fromElement==a.target?a.toElement:a.fromElement;if(a.pageX==null&&a.clientX!=null){var d=document.documentElement,body=document.body;a.pageX=a.clientX+(d&&d.scrollLeft||body&&body.scrollLeft||0)-(d.clientLeft||0);a.pageY=a.clientY+(d&&d.scrollTop||body&&body.scrollTop||0)-(d.clientTop||0)}if(!a.which&&((a.charCode||a.charCode===0)?a.charCode:a.keyCode))a.which=a.charCode||a.keyCode;if(!a.metaKey&&a.ctrlKey)a.metaKey=a.ctrlKey;if(!a.which&&a.button)a.which=(a.button&1?1:(a.button&2?3:(a.button&4?2:0)));return a},proxy:function(a,b){b.guid=a.guid=a.guid||b.guid||this.guid++;return b},special:{ready:{setup:function(){bindReady();return},teardown:function(){return}},mouseenter:{setup:function(){if(v.browser.msie)return false;v(this).bind("mouseover",v.event.special.mouseenter.handler);return true},teardown:function(){if(v.browser.msie)return false;v(this).unbind("mouseover",v.event.special.mouseenter.handler);return true},handler:function(a){if(D(a,this))return true;a.type="mouseenter";return v.event.handle.apply(this,arguments)}},mouseleave:{setup:function(){if(v.browser.msie)return false;v(this).bind("mouseout",v.event.special.mouseleave.handler);return true},teardown:function(){if(v.browser.msie)return false;v(this).unbind("mouseout",v.event.special.mouseleave.handler);return true},handler:function(a){if(D(a,this))return true;a.type="mouseleave";return v.event.handle.apply(this,arguments)}}}};v.fn.extend({bind:function(a,b,c){return a=="unload"?this.one(a,b,c):this.each(function(){v.event.add(this,a,c||b,c&&b)})},one:function(b,c,d){var e=v.event.proxy(d||c,function(a){v(this).unbind(a,e);return(d||c).apply(this,arguments)});return this.each(function(){v.event.add(this,b,e,d&&c)})},unbind:function(a,b){return this.each(function(){v.event.remove(this,a,b)})},trigger:function(a,b,c){return this.each(function(){v.event.trigger(a,b,this,true,c)})},triggerHandler:function(a,b,c){return this[0]&&v.event.trigger(a,b,this[0],false,c)},toggle:function(b){var c=arguments,i=1;while(i<c.length)v.event.proxy(b,c[i++]);return this.click(v.event.proxy(b,function(a){this.lastToggle=(this.lastToggle||0)%i;a.preventDefault();return c[this.lastToggle++].apply(this,arguments)||false}))},hover:function(a,b){return this.bind('mouseenter',a).bind('mouseleave',b)},ready:function(a){bindReady();if(v.isReady)a.call(document,v);else v.readyList.push(function(){return a.call(this,v)});return this}});v.extend({isReady:false,readyList:[],ready:function(){if(!v.isReady){v.isReady=true;if(v.readyList){v.each(v.readyList,function(){this.call(document)});v.readyList=null}v(document).triggerHandler("ready")}}});var C=false;function bindReady(){if(C)return;C=true;if(document.addEventListener&&!v.browser.opera)document.addEventListener("DOMContentLoaded",v.ready,false);if(v.browser.msie&&window==top)(function(){if(v.isReady)return;try{document.documentElement.doScroll("left")}catch(error){setTimeout(arguments.callee,0);return}v.ready()})();if(v.browser.opera)document.addEventListener("DOMContentLoaded",function(){if(v.isReady)return;for(var i=0;i<document.styleSheets.length;i++)if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);return}v.ready()},false);if(v.browser.safari){var a;(function(){if(v.isReady)return;if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return}if(a===undefined)a=v("style, link[rel=stylesheet]").length;if(document.styleSheets.length!=a){setTimeout(arguments.callee,0);return}v.ready()})()}v.event.add(window,"load",v.ready)}v.each(("blur,focus,load,resize,scroll,unload,click,dblclick,"+"mousedown,mouseup,mousemove,mouseover,mouseout,change,select,"+"submit,keydown,keypress,keyup,error").split(","),function(i,b){v.fn[b]=function(a){return a?this.bind(b,a):this.trigger(b)}});var D=function(a,b){var c=a.relatedTarget;while(c&&c!=b)try{c=c.parentNode}catch(error){c=b}return c==b};v(window).bind("unload",function(){v("*").add(document).unbind()});v.fn.extend({_load:v.fn.load,load:function(c,d,e){if(typeof c!='string')return this._load(c);var f=c.indexOf(" ");if(f>=0){var g=c.slice(f,c.length);c=c.slice(0,f)}e=e||function(){};var h="GET";if(d)if(v.isFunction(d)){e=d;d=null}else{d=v.param(d);h="POST"}var i=this;v.ajax({url:c,type:h,dataType:"html",data:d,complete:function(a,b){if(b=="success"||b=="notmodified")i.html(g?v("<div/>").append(a.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(g):a.responseText);i.each(e,[a.responseText,b,a])}});return this},serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return v.nodeName(this,"form")?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password/i.test(this.type))}).map(function(i,b){var c=v(this).val();return c==null?null:c.constructor==Array?v.map(c,function(a,i){return{name:b.name,value:a}}):{name:b.name,value:c}}).get()}});v.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(i,o){v.fn[o]=function(f){return this.bind(o,f)}});var E=now();v.extend({get:function(a,b,c,d){if(v.isFunction(b)){c=b;b=null}return v.ajax({type:"GET",url:a,data:b,success:c,dataType:d})},getScript:function(a,b){return v.get(a,null,b,"script")},getJSON:function(a,b,c){return v.get(a,b,c,"json")},post:function(a,b,c,d){if(v.isFunction(b)){c=b;b={}}return v.ajax({type:"POST",url:a,data:b,success:c,dataType:d})},ajaxSetup:function(a){v.extend(v.ajaxSettings,a)},ajaxSettings:{url:location.href,global:true,type:"GET",timeout:0,contentType:"application/x-www-form-urlencoded",processData:true,async:true,data:null,username:null,password:null,accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(s){s=v.extend(true,s,v.extend(true,{},v.ajaxSettings,s));var c,jsre=/=\?(&|$)/g,status,data,type=s.type.toUpperCase();if(s.data&&s.processData&&typeof s.data!="string")s.data=v.param(s.data);if(s.dataType=="jsonp"){if(type=="GET"){if(!s.url.match(jsre))s.url+=(s.url.match(/\?/)?"&":"?")+(s.jsonp||"callback")+"=?"}else if(!s.data||!s.data.match(jsre))s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?";s.dataType="json"}if(s.dataType=="json"&&(s.data&&s.data.match(jsre)||s.url.match(jsre))){c="jsonp"+E++;if(s.data)s.data=(s.data+"").replace(jsre,"="+c+"$1");s.url=s.url.replace(jsre,"="+c+"$1");s.dataType="script";window[c]=function(a){data=a;success();complete();window[c]=undefined;try{delete window[c]}catch(e){}if(h)h.removeChild(i)}}if(s.dataType=="script"&&s.cache==null)s.cache=false;if(s.cache===false&&type=="GET"){var d=now();var f=s.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+d+"$2");s.url=f+((f==s.url)?(s.url.match(/\?/)?"&":"?")+"_="+d:"")}if(s.data&&type=="GET"){s.url+=(s.url.match(/\?/)?"&":"?")+s.data;s.data=null}if(s.global&&!v.active++)v.event.trigger("ajaxStart");var g=/^(?:\w+:)?\/\/([^\/?#]+)/;if(s.dataType=="script"&&type=="GET"&&g.test(s.url)&&g.exec(s.url)[1]!=location.host){var h=document.getElementsByTagName("head")[0];var i=document.createElement("script");i.src=s.url;if(s.scriptCharset)i.charset=s.scriptCharset;if(!c){var j=false;i.onload=i.onreadystatechange=function(){if(!j&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){j=true;success();complete();h.removeChild(i)}}}h.appendChild(i);return undefined}var k=false;var l=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();if(s.username)l.open(type,s.url,s.async,s.username,s.password);else l.open(type,s.url,s.async);try{if(s.data)l.setRequestHeader("Content-Type",s.contentType);if(s.ifModified)l.setRequestHeader("If-Modified-Since",v.lastModified[s.url]||"Thu, 01 Jan 1970 00:00:00 GMT");l.setRequestHeader("X-Requested-With","XMLHttpRequest");l.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*":s.accepts._default)}catch(e){}if(s.beforeSend&&s.beforeSend(l,s)===false){s.global&&v.active--;l.abort();return false}if(s.global)v.event.trigger("ajaxSend",[l,s]);var m=function(a){if(!k&&l&&(l.readyState==4||a=="timeout")){k=true;if(n){clearInterval(n);n=null}status=a=="timeout"&&"timeout"||!v.httpSuccess(l)&&"error"||s.ifModified&&v.httpNotModified(l,s.url)&&"notmodified"||"success";if(status=="success"){try{data=v.httpData(l,s.dataType,s.dataFilter)}catch(e){status="parsererror"}}if(status=="success"){var b;try{b=l.getResponseHeader("Last-Modified")}catch(e){}if(s.ifModified&&b)v.lastModified[s.url]=b;if(!c)success()}else v.handleError(s,l,status);complete();if(s.async)l=null}};if(s.async){var n=setInterval(m,13);if(s.timeout>0)setTimeout(function(){if(l){l.abort();if(!k)m("timeout")}},s.timeout)}try{l.send(s.data)}catch(e){v.handleError(s,l,null,e)}if(!s.async)m();function success(){if(s.success)s.success(data,status);if(s.global)v.event.trigger("ajaxSuccess",[l,s])}function complete(){if(s.complete)s.complete(l,status);if(s.global)v.event.trigger("ajaxComplete",[l,s]);if(s.global&&!--v.active)v.event.trigger("ajaxStop")}return l},handleError:function(s,a,b,e){if(s.error)s.error(a,b,e);if(s.global)v.event.trigger("ajaxError",[a,s,e])},active:0,httpSuccess:function(a){try{return!a.status&&location.protocol=="file:"||(a.status>=200&&a.status<300)||a.status==304||a.status==1223||v.browser.safari&&a.status==undefined}catch(e){}return false},httpNotModified:function(a,b){try{var c=a.getResponseHeader("Last-Modified");return a.status==304||c==v.lastModified[b]||v.browser.safari&&a.status==undefined}catch(e){}return false},httpData:function(a,b,c){var d=a.getResponseHeader("content-type"),xml=b=="xml"||!b&&d&&d.indexOf("xml")>=0,data=xml?a.responseXML:a.responseText;if(xml&&data.documentElement.tagName=="parsererror")throw"parsererror";if(c)data=c(data,b);if(b=="script")v.globalEval(data);if(b=="json")data=eval("("+data+")");return data},param:function(a){var s=[];if(a.constructor==Array||a.jquery)v.each(a,function(){s.push(encodeURIComponent(this.name)+"="+encodeURIComponent(this.value))});else for(var j in a)if(a[j]&&a[j].constructor==Array)v.each(a[j],function(){s.push(encodeURIComponent(j)+"="+encodeURIComponent(this))});else s.push(encodeURIComponent(j)+"="+encodeURIComponent(v.isFunction(a[j])?a[j]():a[j]));return s.join("&").replace(/%20/g,"+")}});v.fn.extend({show:function(b,c){return b?this.animate({height:"show",width:"show",opacity:"show"},b,c):this.filter(":hidden").each(function(){this.style.display=this.oldblock||"";if(v.css(this,"display")=="none"){var a=v("<"+this.tagName+" />").appendTo("body");this.style.display=a.css("display");if(this.style.display=="none")this.style.display="block";a.remove()}}).end()},hide:function(a,b){return a?this.animate({height:"hide",width:"hide",opacity:"hide"},a,b):this.filter(":visible").each(function(){this.oldblock=this.oldblock||v.css(this,"display");this.style.display="none"}).end()},_toggle:v.fn.toggle,toggle:function(a,b){return v.isFunction(a)&&v.isFunction(b)?this._toggle.apply(this,arguments):a?this.animate({height:"toggle",width:"toggle",opacity:"toggle"},a,b):this.each(function(){v(this)[v(this).is(":hidden")?"show":"hide"]()})},slideDown:function(a,b){return this.animate({height:"show"},a,b)},slideUp:function(a,b){return this.animate({height:"hide"},a,b)},slideToggle:function(a,b){return this.animate({height:"toggle"},a,b)},fadeIn:function(a,b){return this.animate({opacity:"show"},a,b)},fadeOut:function(a,b){return this.animate({opacity:"hide"},a,b)},fadeTo:function(a,b,c){return this.animate({opacity:b},a,c)},animate:function(g,h,i,j){var k=v.speed(h,i,j);return this[k.queue===false?"each":"queue"](function(){if(this.nodeType!=1)return false;var f=v.extend({},k),p,hidden=v(this).is(":hidden"),self=this;for(p in g){if(g[p]=="hide"&&hidden||g[p]=="show"&&!hidden)return f.complete.call(this);if(p=="height"||p=="width"){f.display=v.css(this,"display");f.overflow=this.style.overflow}}if(f.overflow!=null)this.style.overflow="hidden";f.curAnim=v.extend({},g);v.each(g,function(a,b){var e=new v.fx(self,f,a);if(/toggle|show|hide/.test(b))e[b=="toggle"?hidden?"show":"hide":b](g);else{var c=b.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),start=e.cur(true)||0;if(c){var d=parseFloat(c[2]),unit=c[3]||"px";if(unit!="px"){self.style[a]=(d||1)+unit;start=((d||1)/e.cur(true))*start;self.style[a]=start+unit}if(c[1])d=((c[1]=="-="?-1:1)*d)+start;e.custom(start,d,unit)}else e.custom(start,b,"")}});return true})},queue:function(a,b){if(v.isFunction(a)||(a&&a.constructor==Array)){b=a;a="fx"}if(!a||(typeof a=="string"&&!b))return F(this[0],a);return this.each(function(){if(b.constructor==Array)F(this,a,b);else{F(this,a).push(b);if(F(this,a).length==1)b.call(this)}})},stop:function(a,b){var c=v.timers;if(a)this.queue([]);this.each(function(){for(var i=c.length-1;i>=0;i--)if(c[i].elem==this){if(b)c[i](true);c.splice(i,1)}});if(!b)this.dequeue();return this}});var F=function(a,b,c){if(a){b=b||"fx";var q=v.data(a,b+"queue");if(!q||c)q=v.data(a,b+"queue",v.makeArray(c))}return q};v.fn.dequeue=function(a){a=a||"fx";return this.each(function(){var q=F(this,a);q.shift();if(q.length)q[0].call(this)})};v.extend({speed:function(a,b,c){var d=a&&a.constructor==Object?a:{complete:c||!c&&b||v.isFunction(a)&&a,duration:a,easing:c&&b||b&&b.constructor!=Function&&b};d.duration=(d.duration&&d.duration.constructor==Number?d.duration:v.fx.speeds[d.duration])||v.fx.speeds.def;d.old=d.complete;d.complete=function(){if(d.queue!==false)v(this).dequeue();if(v.isFunction(d.old))d.old.call(this)};return d},easing:{linear:function(p,n,a,b){return a+b*p},swing:function(p,n,a,b){return((-Math.cos(p*Math.PI)/2)+0.5)*b+a}},timers:[],timerId:null,fx:function(a,b,c){this.options=b;this.elem=a;this.prop=c;if(!b.orig)b.orig={}}});v.fx.prototype={update:function(){if(this.options.step)this.options.step.call(this.elem,this.now,this);(v.fx.step[this.prop]||v.fx.step._default)(this);if(this.prop=="height"||this.prop=="width")this.elem.style.display="block"},cur:function(a){if(this.elem[this.prop]!=null&&this.elem.style[this.prop]==null)return this.elem[this.prop];var r=parseFloat(v.css(this.elem,this.prop,a));return r&&r>-10000?r:parseFloat(v.curCSS(this.elem,this.prop))||0},custom:function(b,c,d){this.startTime=now();this.start=b;this.end=c;this.unit=d||this.unit||"px";this.now=this.start;this.pos=this.state=0;this.update();var e=this;function t(a){return e.step(a)}t.elem=this.elem;v.timers.push(t);if(v.timerId==null){v.timerId=setInterval(function(){var a=v.timers;for(var i=0;i<a.length;i++)if(!a[i]())a.splice(i--,1);if(!a.length){clearInterval(v.timerId);v.timerId=null}},13)}},show:function(){this.options.orig[this.prop]=v.attr(this.elem.style,this.prop);this.options.show=true;this.custom(0,this.cur());if(this.prop=="width"||this.prop=="height")this.elem.style[this.prop]="1px";v(this.elem).show()},hide:function(){this.options.orig[this.prop]=v.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(a){var t=now();if(a||t>this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var b=true;for(var i in this.options.curAnim)if(this.options.curAnim[i]!==true)b=false;if(b){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(v.css(this.elem,"display")=="none")this.elem.style.display="block"}if(this.options.hide)this.elem.style.display="none";if(this.options.hide||this.options.show)for(var p in this.options.curAnim)v.attr(this.elem.style,p,this.options.orig[p])}if(b)this.options.complete.call(this.elem);return false}else{var n=t-this.startTime;this.state=n/this.options.duration;this.pos=v.easing[this.options.easing||(v.easing.swing?"swing":"linear")](this.state,n,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};v.extend(v.fx,{speeds:{slow:600,fast:200,def:400},step:{scrollLeft:function(a){a.elem.scrollLeft=a.now},scrollTop:function(a){a.elem.scrollTop=a.now},opacity:function(a){v.attr(a.elem.style,"opacity",a.now)},_default:function(a){a.elem.style[a.prop]=a.now+a.unit}}});v.fn.offset=function(){var b=0,top=0,elem=this[0],results;if(elem)with(v.browser){var c=elem.parentNode,offsetChild=elem,offsetParent=elem.offsetParent,doc=elem.ownerDocument,safari2=safari&&parseInt(version)<522&&!/adobeair/i.test(y),css=v.curCSS,fixed=css(elem,"position")=="fixed";if(elem.getBoundingClientRect){var d=elem.getBoundingClientRect();add(d.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),d.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));add(-doc.documentElement.clientLeft,-doc.documentElement.clientTop)}else{add(elem.offsetLeft,elem.offsetTop);while(offsetParent){add(offsetParent.offsetLeft,offsetParent.offsetTop);if(mozilla&&!/^t(able|d|h)$/i.test(offsetParent.tagName)||safari&&!safari2)border(offsetParent);if(!fixed&&css(offsetParent,"position")=="fixed")fixed=true;offsetChild=/^body$/i.test(offsetParent.tagName)?offsetChild:offsetParent;offsetParent=offsetParent.offsetParent}while(c&&c.tagName&&!/^body|html$/i.test(c.tagName)){if(!/^inline|table.*$/i.test(css(c,"display")))add(-c.scrollLeft,-c.scrollTop);if(mozilla&&css(c,"overflow")!="visible")border(c);c=c.parentNode}if((safari2&&(fixed||css(offsetChild,"position")=="absolute"))||(mozilla&&css(offsetChild,"position")!="absolute"))add(-doc.body.offsetLeft,-doc.body.offsetTop);if(fixed)add(Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),Math.max(doc.documentElement.scrollTop,doc.body.scrollTop))}results={top:top,left:b}}function border(a){add(v.curCSS(a,"borderLeftWidth",true),v.curCSS(a,"borderTopWidth",true))}function add(l,t){b+=parseInt(l,10)||0;top+=parseInt(t,10)||0}return results};v.fn.extend({position:function(){var a=0,top=0,results;if(this[0]){var b=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(b[0].tagName)?{top:0,left:0}:b.offset();offset.top-=num(this,'marginTop');offset.left-=num(this,'marginLeft');parentOffset.top+=num(b,'borderTopWidth');parentOffset.left+=num(b,'borderLeftWidth');results={top:offset.top-parentOffset.top,left:offset.left-parentOffset.left}}return results},offsetParent:function(){var a=this[0].offsetParent;while(a&&(!/^body|html$/i.test(a.tagName)&&v.css(a,'position')=='static'))a=a.offsetParent;return v(a)}});v.each(['Left','Top'],function(i,b){var c='scroll'+b;v.fn[c]=function(a){if(!this[0])return;return a!=undefined?this.each(function(){this==window||this==document?window.scrollTo(!i?a:v(window).scrollLeft(),i?a:v(window).scrollTop()):this[c]=a}):this[0]==window||this[0]==document?self[i?'pageYOffset':'pageXOffset']||v.boxModel&&document.documentElement[c]||document.body[c]:this[0][c]}});v.each(["Height","Width"],function(i,b){var c=i?"Left":"Top",br=i?"Right":"Bottom";v.fn["inner"+b]=function(){return this[b.toLowerCase()]()+num(this,"padding"+c)+num(this,"padding"+br)};v.fn["outer"+b]=function(a){return this["inner"+b]()+num(this,"border"+c+"Width")+num(this,"border"+br+"Width")+(a?num(this,"margin"+c)+num(this,"margin"+br):0)}})})();


(function($){$.fn.bgIframe=$.fn.bgiframe=function(s){if($.browser.msie&&/6.0/.test(navigator.userAgent)){s=$.extend({top:'auto',left:'auto',width:'auto',height:'auto',opacity:true,src:'javascript:false;'},s||{});var prop=function(n){return n&&n.constructor==Number?n+'px':n;},html='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+'style="display:block;position:absolute;z-index:-1;'+(s.opacity!==false?'filter:Alpha(Opacity=\'0\');':'')+'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+'"/>';return this.each(function(){if($('> iframe.bgiframe',this).length==0)this.insertBefore(document.createElement(html),this.firstChild);});}return this;};})(jQuery);


jQuery.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options.expires=-1}var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000))}else{date=options.expires}expires='; expires='+date.toUTCString()}var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('')}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break}}}return cookieValue}};


(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);


if(typeof jQueryLoaded=='function')jQueryLoaded();
;//脚本所应用到的样式表
document.writeln("<style media=\"screen\" type=\"text\/css\">");
document.writeln(".sliderwrapper{overflow:hidden;}");
document.writeln(".sliderwrapper .contentdiv{height:100%;display:none;overflow:hidden;}");
document.writeln(".sliderfilter{filter:progid:DXImageTransform.Microsoft.alpha(opacity=100);-moz-opacity:1;opacity:1;}");
document.writeln("<\/style>");

//焦点图与舌签轮换 08.12.09
var featuredcontentslider={
ajaxloadingmsg: '<div>请稍候…</div>',
bustajaxcache: true,
enablepersist: true,
settingcaches: {},

buildcontentdivs:function(setting){
var alldivs=document.getElementById(setting.id).getElementsByTagName("div")
for (var i=0; i<alldivs.length; i++){
if (this.css(alldivs[i], "contentdiv", "check")){ //检查带有 class 名为 "contentdiv" 的 div 标签
setting.contentdivs.push(alldivs[i])
alldivs[i].style.display="none" // 执行时将所有div标签 display="none"
}
}
},

setopacity:function(setting, value){ //赋予targetobject变量中的模块透明度，取值0-1之间
var targetobject=setting.contentdivs[setting.currentpage-1]
targetobject.className = "contentdiv sliderfilter";
if (targetobject.filters && targetobject.filters[0]){ //IE syntax
if (typeof targetobject.filters[0].opacity=="number") //IE6
targetobject.filters[0].opacity=value*100
else //IE 5.5
targetobject.style.filter="alpha(opacity="+value*100+")"
}
else if (typeof targetobject.style.MozOpacity!="undefined") //Old Mozilla syntax
targetobject.style.MozOpacity=value
else if (typeof targetobject.style.opacity!="undefined") //Standard opacity syntax
targetobject.style.opacity=value
setting.curopacity=value
},

fadeup:function(setting){
if (setting.curopacity<=0.9){ //当curopacity值小于或等于0.9时
this.setopacity(setting, setting.curopacity+setting.enablefade[1])
window["fcsfade"+setting.id]=setTimeout(function(){featuredcontentslider.fadeup(setting)}, 25)
}
else{ //当渐变已经完成，即 当curopacity值大于0.9时
this.setopacity(setting, setting.curopacity-setting.enablefade[1])
var targetobject=setting.contentdivs[setting.currentpage-1]
targetobject.className = "contentdiv";
}
},

jumpTo:function(fcsid, pagenumber){ //public function to go to a slide manually.
this.turnpage(this.settingcaches[fcsid], pagenumber)
},

turnpage:function(setting, thepage, autocall){
var currentpage=setting.currentpage //定义当前
var totalpages=setting.contentdivs.length
var turntopage=(/prev/i.test(thepage))? currentpage-1 : (/next/i.test(thepage))? currentpage+1 : parseInt(thepage)
turntopage=(turntopage<1)? totalpages : (turntopage>totalpages)? 1 : turntopage //test for out of bound and adjust
if (turntopage==setting.currentpage && typeof autocall=="undefined") //if a pagination link is clicked on repeatedly
return
setting.currentpage=turntopage
setting.contentdivs[setting.prevpage-1].style.display="none" //collapse last content div shown (it was set to "block")
setting.contentdivs[turntopage-1].style.zIndex=++setting.topzindex
this.cleartimer(setting, window["fcsfade"+setting.id])
setting.cacheprevpage=setting.prevpage
if (setting.enablefade[0]==true){
setting.curopacity=0
this.fadeup(setting)
}
if (setting.enablefade[0]==false){ //if fade is disabled, fire onChange event immediately (verus after fade is complete)
setting.onChange(setting.prevpage, setting.currentpage)
}
setting.contentdivs[turntopage-1].style.visibility="visible"
setting.contentdivs[turntopage-1].style.display="block"
if (setting.prevpage<=setting.toclinks.length) //make sure pagination link exists (may not if manually defined via "markup", and user omitted)
this.css(setting.toclinks[setting.prevpage-1], "selected", "remove")
if (turntopage<=setting.toclinks.length) //make sure pagination link exists (may not if manually defined via "markup", and user omitted)
this.css(setting.toclinks[turntopage-1], "selected", "add")
setting.prevpage=turntopage
if (this.enablepersist)
this.setCookie("fcspersist"+setting.id, turntopage)
},

ajaxconnect:function(setting){
var page_request = false
if (window.ActiveXObject){ //IE中的 ActiveXObject 支持，对于IE7是无效的
try {
page_request = new ActiveXObject("Msxml2.XMLHTTP")
}
catch (e){
try{
page_request = new ActiveXObject("Microsoft.XMLHTTP")
}
catch (e){}
}
}
else if (window.XMLHttpRequest) // Mozilla, Safari 等浏览器
page_request = new XMLHttpRequest()
else
return false
var pageurl=setting.contentsource[1]
page_request.onreadystatechange=function(){
featuredcontentslider.ajaxpopulate(page_request, setting)
}
document.getElementById(setting.id).innerHTML=this.ajaxloadingmsg
var bustcache=(!this.bustajaxcache)? "" : (pageurl.indexOf("?")!=-1)? "&"+new Date().getTime() : "?"+new Date().getTime()
page_request.open('GET', pageurl+bustcache, true)
page_request.send(null)
},

ajaxpopulate:function(page_request, setting){
if (page_request.readyState == 4 && (page_request.status==200 || window.location.href.indexOf("http")==-1)){
document.getElementById(setting.id).innerHTML=page_request.responseText
this.buildpaginate(setting)
}
},

buildpaginate:function(setting){
this.buildcontentdivs(setting)
var sliderdiv=document.getElementById(setting.id)
var pdiv=document.getElementById("paginate-"+setting.id)
var phtml=""
var toc=setting.toc
var nextprev=setting.nextprev
if (typeof toc=="string" && toc!="markup" || typeof toc=="object"){
for (var i=1; i<=setting.contentdivs.length; i++){
phtml+='<i class="iToc"><a href="#'+i+'" class="toc">'+(typeof toc=="string"? toc.replace(/#increment/, i) : toc[i-1])+'</a></i> '
}
phtml=(nextprev[0]!=''? '<i class="iToc"><a href="#prev" class="prev">'+nextprev[0]+'</a></i> ' : '') + phtml + (nextprev[1]!=''? '<i class="iToc"><a href="#next" class="next"><em>'+nextprev[1]+'</a></i>' : '')
pdiv.innerHTML='<i class="subLineTab"></i><span class="subPageTab">'+phtml+'</span>'
}
var pdivlinks=pdiv.getElementsByTagName("a")
var toclinkscount=0 //var to keep track of actual # of toc links
for (var i=0; i<pdivlinks.length; i++){
if (this.css(pdivlinks[i], "toc", "check")){
if (toclinkscount>setting.contentdivs.length-1){ //if this toc link is out of range (user defined more toc links then there are contents)
pdivlinks[i].style.display="none" //hide this toc link
continue
}
pdivlinks[i].setAttribute("rel", ++toclinkscount) //store page number inside toc link
pdivlinks[i][setting.revealtype]=function(){
featuredcontentslider.turnpage(setting, this.getAttribute("rel"))
return false
}
setting.toclinks.push(pdivlinks[i])
}
else if (this.css(pdivlinks[i], "prev", "check") || this.css(pdivlinks[i], "next", "check")){ //check for links with class "prev" or "next"
pdivlinks[i].onclick=function(){
featuredcontentslider.turnpage(setting, this.className)
return false
}
}
}
this.turnpage(setting, setting.currentpage, true)
if (setting.autorotate[0]){ //当设置为自动轮换时，即 autorotate 为 true 时
pdiv[setting.revealtype]=function(){
return false
}
pdiv["onmouseover"]=function(){
featuredcontentslider.cleartimer(setting, window["fcsautorun"+setting.id])// onmouseover，停止自动轮换
return false
}
pdiv["onmouseout"]=function(){
featuredcontentslider.autorotate(setting)// onmouseout 后，继续自动轮换
return false
}
sliderdiv["onclick"]=function(){ //onclick 时，停止鼠标滑动感应，也就是此时 onmouseover 没有动作
featuredcontentslider.cleartimer(setting, window["fcsautorun"+setting.id])
}
setting.autorotate[1]=setting.autorotate[1]+(1/setting.enablefade[1]*50) //添加轮换停留时间
this.autorotate(setting)
}
},

urlparamselect:function(fcsid){
var result=window.location.search.match(new RegExp(fcsid+"=(\\d+)", "i")) //check for "?featuredcontentsliderid=2" in URL
return (result==null)? null : parseInt(RegExp.$1) //returns null or index, where index (int) is the selected tab's index
},

cleartimer:function(setting, timervar){
if (typeof timervar!="undefined"){
clearTimeout(timervar)
clearInterval(timervar)
if (setting.cacheprevpage!=setting.currentpage){ //if previous content isn't the same as the current shown div
setting.contentdivs[setting.cacheprevpage-1].style.display="none"
}
}
},

css:function(el, targetclass, action){
var needle=new RegExp("(^|\\s+)"+targetclass+"($|\\s+)", "ig")
if (action=="check")
return needle.test(el.className)
else if (action=="remove")
el.className=el.className.replace(needle, "")
else if (action=="add")
el.className+=" "+targetclass
},

autorotate:function(setting){
window["fcsautorun"+setting.id]=setInterval(function(){featuredcontentslider.turnpage(setting, "next")}, setting.autorotate[1])
},

getCookie:function(Name){
var re=new RegExp(Name+"=[^;]+", "i"); //construct RE to search for target name/value pair
if (document.cookie.match(re)) //if cookie found
return document.cookie.match(re)[0].split("=")[1] //return its value
return null
},

setCookie:function(name, value){
document.cookie = name+"="+value
},

iframeconnect:function(setting){ //增加iframe处理事件，支持iframe的轮换，但iframe与div的相互组合目前不能完成，即轮换内容既有iframe的内容又有div的内容的时候
var ifr = document.createElement('iframe');
ifr.id='iframeconnect'+new Date().getTime();
ifr.style.display='none';
var self = this;
var got = function(){
var d = ifr.contentDocument ? ifr.contentDocument : document.frames[ifr.id].document;
document.getElementById(setting.id).innerHTML=d.body.innerHTML;
document.body.removeChild(ifr);
self.buildpaginate(setting)
};
ifr.onload=got;
ifr.onreadystatechange=function(){
if(this.readyState=='complete') got();
}
ifr.src = setting.contentsource[1];
document.body.insertBefore(ifr,document.body.firstChild);
},

init:function(setting){
var persistedpage=this.getCookie("fcspersist"+setting.id) || 1
var urlselectedpage=this.urlparamselect(setting.id) //returns null or index from: mypage.htm?featuredcontentsliderid=index
this.settingcaches[setting.id]=setting //存储 "setting" 对象
setting.contentdivs=[]
setting.toclinks=[]
setting.topzindex=0
setting.currentpage=urlselectedpage || ((this.enablepersist)? persistedpage : 1)
setting.prevpage=setting.currentpage
setting.revealtype="on"+(setting.revealtype || "click")
setting.curopacity=0
setting.onChange=setting.onChange || function(){}
if (setting.contentsource[0]=="inline")//直接页面调用div
this.buildpaginate(setting)
if (setting.contentsource[0]=="ajax")//调用外部utf-8页面内容
this.ajaxconnect(setting)
if (setting.contentsource[0]=="iframe")//调用外部页面内容，主要以iframe形式获取，获取iframe内标签，主要解决非utf-8的内容
this.iframeconnect(setting)
}

}
;/** 顶部登录条，调用方法是 <span id=ajaxLogon><script src=本js></script></span> */

var pconline = {
	getId : function(objName){if(document.getElementById){return eval('document.getElementById("'+objName+'")')}else{return eval('document.all.'+objName)}},
	addEvent : function(obj,eventType,func){if(obj.attachEvent){obj.attachEvent("on" + eventType,func);}else{obj.addEventListener(eventType,func,false)}},
	delEvent : function(obj,eventType,func){
		if(obj.detachEvent){obj.detachEvent("on" + eventType,func)}else{obj.removeEventListener(eventType,func,false)}
	}
};
function LoginSelectClickOther(e){
	thisObj = e.target?e.target:event.srcElement;
	do{
		if(thisObj.id == "loginselect") return;
		if(thisObj.tagName == "BODY"){LoginSelectClose();return;};
		thisObj = thisObj.parentNode;
	}while(thisObj.parentNode);
};
function clickLoginSelect(){
	if(pconline.getId("loginopt").style.display == "block"){
		LoginSelectClose();
	}else{
		pconline.getId("loginopt").style.display = "block";
		pconline.addEvent(document.body,"mousedown",LoginSelectClickOther);
	}
};
function LoginSelectClose(){
	pconline.getId("loginopt").style.display = "none";
	pconline.delEvent(document.body,"mousedown",LoginSelectClickOther);
};
function LoginSelect(title){
	var titleName;
	switch(title){
		case "pcclub":
			titleName = "PCclub";
			document.loginform.direction.value="PCclub";
			document.loginform.action="http://pass.pconline.com.cn/permit/passport/login.jsp";
			break;
		case "company":
			titleName = "商家";
			document.loginform.direction.value="商家";
			document.loginform.action="http://eyp.pconline.com.cn/member/login.htm";
			break;
	};
	pconline.getId("loginselectdis").innerHTML = titleName;
	LoginSelectClose();
};

function ajaxLogon() {
if(document.getElementById('ajaxLogon') == null) return;
document.getElementById('ajaxLogon').innerHTML=
    //-----未登录
    '<span class="off" '+(!document.cookie.match(/(^|; )common_session_id=[^;]+/)?'':'style="display:none"')+'>'+
    '<form action="http://pass.pconline.com.cn/permit/passport/login.jsp" style="margin:0;display:inline" name="loginform" method="post">'+
    '<input style="background:no-repeat url(http://www1.pconline.com.cn/script/ajaxLogon.gif);" name=username size=10 onfocus="style.backgroundPosition=\'0 -25px\'" onblur="if(value==\'\')style.backgroundPosition=\'0 0\';"> '+
    '<input style="background:no-repeat url(http://www1.pconline.com.cn/script/ajaxLogon.gif) 0 -50px;" name=password type=password size=6 onfocus="style.backgroundPosition=\'0 -25px\'" onblur="if(value==\'\')style.backgroundPosition=\'0 -50px\';"> <input type="hidden" name="direction" value="PCclub" />'+
	//'<div class="loginselect" id="loginselect">'+
    //'<span id="loginselectdis" onclick="clickLoginSelect();">选择去向</span>'+
    //'<ul id="loginopt" style="display:none;">'+
    //'<li><a href="javascript:void(0);" target="_self" onclick=\'LoginSelect("pcclub")\'>PCclub</a></li>'+
    //'<li><a href="javascript:void(0);" target="_self" onclick=\'LoginSelect("company")\'>商家</a></li>'+
    //'</ul>'+
    //'</div>'+
    '<input type=submit class=submit value="登录"> <input type=button class=reg value="注册" onclick="window.open(\'http://userdb.pconline.com.cn/userdb/Register_adv.do\',\'register\')" title="可在此取回密码">'+
    '</form></span> '+
    //-----已登录
    '<span class="on" '+(!!document.cookie.match(/(^|; )common_session_id=[^;]+/)?'':'style="display:none"')+'><div class="logined">'+(
//*
    location.host.match(/pconline/)?'<a href="http://www.pconline.com.cn/pcclub/" target=_blank>太平洋社区</a>':
    location.host.match(/pcauto/)?'<a href="http://blogger.pcauto.com.cn/autoblog/accountLogin.do?method=downstageLogin" target=_blank>博客管理</a> ':
    location.host.match(/pcgames/)?'<a href="http://j.pcgames.com.cn/userAdm.jsp" target=_blank>jClub管理</a>':
    location.host.match(/pclady/)?'<a href="http://blog.pclady.com.cn/MemberAdmin.do?method=index" target=_blank>博客管理</a>':
    location.host.match(/pckids/)?'<a href="http://blog.pckids.com.cn/kidsblog/MemberAdmin.do?method=index" target=_blank>博客管理</a>':
/**/
    '')+' <a href="http://space.pconline.com.cn/club/myadm.jsp" target=_blank>空间管理</a> <a href="http://userdb.pconline.com.cn/userdb/RegisterEdit_enter.do" target=_blank>帐号管理</a> <a href="http://pass.pconline.com.cn/permit/passport/exit_ajax.jsp" onclick=" try{jQuery.getScript(href,ajaxLogonRefresh);}catch(e){};return false;">退出</a>'+
    '</div></span>'

    //以下是雅黑字体功能：
    ;//+'<OBJECT id="dlgHelper" CLASSID="clsid:3050f819-98b5-11cf-bb82-00aa00bdce0b" width="0px" height="0px"></OBJECT>';
var ajaxLogonHasYaHei = typeof dlgHelper!='object';
if(!ajaxLogonHasYaHei) for(var i = dlgHelper.fonts.count-1; i>0; i--) {
    if(dlgHelper.fonts(i) == '微软雅黑') { ajaxLogonHasYaHei = true; break; }
}
if(ajaxLogonHasYaHei) {
    //ajaxLogonYaHei();
	/*
    document.getElementById('ajaxLogon').innerHTML+='&nbsp; <a href="#" onclick="blur();setTimeout(\'ajaxLogonYaHei(1)\',0);return false" style="color:#6c6" onmouseover="if(!document.cookie.match(/(^|; )YaHei=/)) $(\'#ajaxLogonYahei\').attr(\'src\',\'http://www1.pconline.com.cn/script/ajaxLogon_yahei.gif\').show()" onmouseout="$(\'#ajaxLogonYahei\').hide()">雅黑?</a><img id=ajaxLogonYahei style="position:absolute;z-index:9999;left:10px;margin-top:2em;display:none">';
	*/
}

} ajaxLogon();//main

function ajaxLogonYaHei(toggle) {
    var yahei = !!document.cookie.match(/(^|; )YaHei=/);
    if(toggle) {
        yahei = !yahei;
        jQuery.cookie('YaHei', '1', {expires:yahei?999:-1,path:'/',domain:location.hostname.replace(/^\w+/,'')});
    }

    document.body.style.fontFamily = yahei ? '微软雅黑' : '';
    try { if(window!=top) top.document.body.style.fontFamily = yahei ? '微软雅黑' : ''; } catch(e) {}
}

function ajaxLogonRefresh() {
    if(!document.cookie.match(/(^|; )common_session_id=[^;]+/) != !jQuery('#ajaxLogon>span:last:visible').length) jQuery('#ajaxLogon>span').toggle();
}


function jQueryLoaded4Logon() {
    var $ = jQuery;
    $('#ajaxLogon form').append($('<input type="hidden" name="return"><input type="hidden" name="fail">').val("http://www1.pconline.com.cn/closeWindow.html"))
    .submit(function(){
        var usr = this['username'].value, pwd = this['password'].value;
        if(usr==''||pwd=='') { alert('请填写用户名和密码'); return false; }
		var direction = this['direction'].value;
        if(direction=='') { alert('请选择去向'); return false; }
        if(this.action.match(/member/)) return; //商家
        $('input[type=submit]',this).css('opacity',.5).attr('disabled',true);

        this.target='pconline_login'; var win=window.open('','pconline_login','height=1, width=1, top=9999, left=0, toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no, status=no'); window.focus();

        var time=0; var fm = this;
        var checker = setInterval(function(){
            if(time++ < 600 && !win.closed) return;
            clearInterval(checker);
            if(win.closed) {
                if(document.cookie.match(/(^|; )common_session_id=[^;]+/)) ajaxLogonRefresh();
                else alert('登录失败! 请检查帐号和密码是否正确。');

            } else {
                win.close();
                alert('登录超时失败，请检查网络状况并再试一次。');
            }
            $('input[type=submit]',fm).css('opacity',1).attr('disabled',false);
        },100);

        //$.getScript(this.action+(this.action.match(/\?/)?"&":"?")+"username=" +usr+"&password="+pwd, ajaxLogonRefresh);
    }); /**/
}

setTimeout(function(){
    if(typeof jQuery!='undefined') return jQueryLoaded4Logon();
    var $_already_defined = typeof $ != 'undefined';
    needJS(window.jQuery,'http://www1.pconline.com.cn/script/jquery-pconline1.2.js',function(){
        if($_already_defined) $ = jQuery.noConflict();
        jQueryLoaded4Logon();
    });
},1000); //等1秒，先显示页面其它内容

function needJS(fn,src,callback) {
    if(typeof fn != 'undefined' && fn != null && fn != '') return callback();
    var status = typeof _needJS_ == 'undefined' ? _needJS_ = {loaded:[],loading:[]} : _needJS_;

    for(var i=0; i<status.loaded.length; i++) {
        if(status.loaded[i] == src) return callback();
    }

    function idx(src) { //供后面的代码调用
        for(var i=0;i<status.loading.length;i++) if(status.loading[i].src==src) return i;
    }

    var loading = status.loading[idx(src)];
    if(loading != null) {
        loading.callbacks.push(callback);
        return;
    }

    status.loading.push(loading = {src:src,callbacks:[callback]});
    var js = document.createElement('script');
    js.src = src;
    js.onload = js.onreadystatechange = function() {
        if(typeof js.readyState == 'undefined' || js.readyState == 'loaded' || js.readyState == 'complete') {
            status.loaded.push(loading.src);
            var callbacks = loading.callbacks;
            status.loading.splice(idx(src),1);
            for(var i = 0; i < callbacks.length; i++) {
                loading.callbacks[i]();
            }
        }
    }
    document.getElementsByTagName('head')[0].appendChild(js);
} //needJS()
;function header() {
;document.write('<div id="header"><div id="logo"><a href="http://www.pcgames.com.cn" title="太平洋游戏网">太平洋游戏网</a></div><div id="ajaxLogon">');

if(typeof window.ajaxLogon=='function') ajaxLogon();
else document.writeln("<script src=\'http://www1.pcgames.com.cn/script/ajaxLogon.js\'><\/script>");

document.write('</div><div id="lead"><a href="http://www.pconline.com.cn/" target="_blank">太平洋电脑网</a> | <a href="http://www.pcauto.com.cn/" target="_blank">太平洋汽车网</a> | <a href="http://www.pclady.com.cn/" target="_blank">太平洋女性网</a> | <a href="http://www.pckids.com.cn/" target="_blank">太平洋亲子网</a> | <a href="http://www.pc.com.cn/" target="_blank">PC购物网</a><span><a href="http://www.pcgames.com.cn/sitemap/sitemap.html" target="_blank">网站地图</a></span></div><div id="nav"><a href="http://www.pcgames.com.cn/" title="首页" target="_blank" class="nav2">首页</a><a href="http://ng.pcgames.com.cn/"  title="新游试玩" target="_blank">新游试玩</a><a href="http://wangyou.pcgames.com.cn/" title="网络游戏" target="_blank">网络游戏</a><a href="http://pc.pcgames.com.cn/" title="电脑游戏" target="_blank">电脑游戏</a><a href="http://www.pcgames.com.cn/tvgames/" title="电视游戏" target="_blank">电视游戏</a><a href="http://fight.pcgames.com.cn/" title="电子竞技" target="_blank">电子竞技</a><a href="http://www.pcgames.com.cn/webgames/" title="网页游戏" target="_blank">网页游戏</a><a href="http://www.pcgames.com.cn/hardware/" title="游戏硬件" target="_blank">游戏硬件</a><a href="http://www.pcgames.com.cn/cartoon/" title="在线动漫" target="_blank">在线动漫</a><a href="http://dl.pcgames.com.cn/" title="游戏下载" target="_blank">游戏下载</a><a href="http://j.pcgames.com.cn/more_activity.jsp?type=hot" title="网站活动" target="_blank" class="navR">网站活动</a></div><div id="subNav"><a href="http://mm.pcgames.com.cn" title="美眉频道" target="_blank">美眉频道</a><a href="http://v.pcgames.com.cn" title="游戏视频" target="_blank">游戏视频</a><a href="http://photos.pcgames.com.cn/" title="美女图库" target="_blank">美女图库</a><a href="http://j.pcgames.com.cn" title="J客部落" target="_blank">J客部落</a><a href="http://gh.pcgames.com.cn/" title="公会联盟" target="_blank">公会联盟</a><a href="http://bbs.pcgames.com.cn" title="互动社区" target="_blank">互动社区</a><a href="http://ks.pcgames.com.cn/" title="找游戏" target="_blank">找游戏</a><a href="http://news.pcgames.com.cn/" title="游戏产业" target="_blank" >游戏产业</a><a href="http://bbs.pcgames.com.cn/forum.jsp?fid=25763"  title="迷你游戏" target="_blank">迷你游戏</a></div><div class="clear"></div></div>');
}