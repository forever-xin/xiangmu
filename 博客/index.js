var XMLHttp;
function blogindex(i)
{
    var id = "#index"+i;
    $(id).animate({height:'toggle',opacity:'toggle'},500);
}
function changecolor(i)
{
    document.getElementById(i).style.border ="1px solid #9ecc00";
}
function colorexit(i)
{
    document.getElementById(i).style.border ="1px solid #84a1bd";
}
function createXMLHTTP()
{
	if(window.XMLHttpRequest){ //Mozilla ie7
		XMLHttp=new XMLHttpRequest();
		}
	else if(window.ActiveXObject){
		try{
			XMLHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				XMLHttp=new ActiveXObject("Microsoft.XMLHTTP");
				}catch(e){}
		}
	}
}
function bloglogin()
{
    var uid = document.getElementById("uid").value;
    var pwd = document.getElementById("pwd").value;
    if(uid.length>18||uid.length<5)
    {
        alert("请输入的帐号长度不对");
        return false;
    }
    if(pwd.length>20||pwd.length<6)
    {
        alert("您的密码长度不对!");
        return false;
    }
    createXMLHTTP();
    var url = "mylogin.aspx?uid="+uid+"&pwd="+pwd;
    XMLHttp.open("GET",url,true);
    XMLHttp.onreadystatechange = function ()
    {
        if(XMLHttp.readyState ==4)
        {
            if(XMLHttp.status ==200)
            {
                var i = XMLHttp.responseText;
                switch(i)
                {
                case "2":
                    document.getElementById("loginNote").innerHTML ="";
                    document.getElementById("login").innerHTML ="<a href='index.aspx'>我的博客</a>|<a href='admin/addblog.aspx'>写日志</a>|<a href=''>上传相片</a>|"+
                        "<a href=''>个人信息</a>|<a href='javascript:void(0)' onclick='logout()'>退出</a>";
                    break;
                case "0":
                    document.getElementById("loginNote").innerHTML ="密码不正确!";
                    break;
                case "1":
                    document.getElementById("loginNote").innerHTML ="用户名不存在!";
                    break;
                default:
                    document.getElementById("loginNote").innerHTML ="发生异常!";
                    break;
                }
             }
        }
        else
        {
            document.getElementById("loginNote").innerHTML ="正在登陆.....";
        }
    }
    XMLHttp.send(null);

}
function logined()
{
    document.getElementById("login").innerHTML ="<a href='index.aspx'>我的博客</a>|<a href='admin/addblog.aspx'>写日志</a>|<a href=''>上传相片</a>|"+
                        "<a href=''>个人信息</a>|<a href='javascript:void(0)' onclick='logout()'>退出</a>";
}
function test()
{
    alert(location.toString());
}
function logout()
{
    createXMLHTTP();
    XMLHttp.open("GET","logout.aspx",true);
    XMLHttp.onreadystatechange = function ()
    {
        if(XMLHttp.readyState ==4)
            {
                if(XMLHttp.status ==200)
                {
                    alert("leining");
                }
            }
    }
    XMLHttp.send(null);



}
