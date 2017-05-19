
$("#J_getcookie").on("click", function(){
	renderCookie();
});

$("#J_remove_cookie").on("click", function(){
	delCookie("servercookie1");
	delCookie("servercookie2");
	delCookie("servercookie3");
	renderCookie();
});


$("#J_server_setcookie").on("click", function(){
	
		$.ajax({
			url: "./users",
			dataType: "json",			
			type: "get",
			success: function(result) {
				
				if (result.ret == 0) {
					alert("调用成功");
					renderCookie();
					
				} else {
					alert("调用失败");
				}
			},
			error: function(error) {				
				alert("调用失败");
			}
		});
	
});



function renderCookie(){
	var cookie1 = getCookie("servercookie1");
	var cookie2 = getCookie("servercookie2");
	var cookie3 = getCookie("servercookie3");
	
	var html = "servercookie1:" + cookie1 + "<br>" + "servercookie2:" + cookie2 + "<br>" +"servercookie3:" + cookie3

	$("#J_cookie_div").html(html);
}



 function getCookie(name) {
        //读取COOKIE
        var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"), val = document.cookie.match(reg);
        if(!val || !val[2]){return "";}
        var res = val[2];
        try{
            if(/(%[0-9A-F]{2}){2,}/.test(res)){//utf8编码
               return decodeURIComponent(res);
            }else{//unicode编码
                return unescape(res);
            }            
        }catch(e){
            return unescape(res);
        }

    }

    function setCookie(name, value, expires, path, domain, secure) {
        //写入COOKIES
        var exp = new Date(), expires = arguments[2] || null, path = arguments[3] || "/", domain = arguments[4] || null, secure = arguments[5] || false;
        expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
        document.cookie = name + '=' + escape(value) + ( expires ? ';expires=' + exp.toGMTString() : '') + ( path ? ';path=' + path : '') + ( domain ? ';domain=' + domain : '') + ( secure ? ';secure' : '');
    }

    function delCookie(name, path, domain, secure) {
        //删除cookie
        var value = getCookie(name);
        if(value != null) {
            var exp = new Date();
            exp.setMinutes(exp.getMinutes() - 1000);
            path = path || "/";
            document.cookie = name + '=;expires=' + exp.toGMTString() + ( path ? ';path=' + path : '') + ( domain ? ';domain=' + domain : '') + ( secure ? ';secure' : '');
        }
    }