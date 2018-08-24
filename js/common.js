//全局url
var url = 'http://101.132.141.130:82/api';
var token = null;
var getToken = function(data){
	token = data;
}
function get(){
    var wvs=plus.webview.all();
    for(var i=0;i<wvs.length;i++){
        console.log('webview'+i+': '+wvs[i].id);
    }		
}

function getCSS(obj){ 
	return document.defaultView.getComputedStyle(obj, null);
}

//检查邮箱格式
//	var checkEmail = function(email) {
//		email = email || '';
//		return (email.length > 3 && email.indexOf('@') > -1);
//	};
	

//检查手机号格式
var checkPhone = function(phone){
	var reg=/^[1][3,4,5,7,8][0-9]{9}$/;
    return reg.test(phone);
}

//检查验证码
var checkCode = function(code){
	return code.length==0;
}

//检查密码
var checkPwd = function(pwd){
	var reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[_.@]){5,13}$/;
	return reg.test(pwd);
}
	


window.width = document.body.clientWidth;


//获取验证码
var getCode = function(phone,id){
	this.phone = document.querySelector(phone);
	this.obj = document.querySelector(id);
	this.Val();
}

getCode.prototype.Val = function(){
	var _this=this;
	this.obj.innerText = '获取验证码';
	this.time = 60;
	this.timer = null;
	this.obj.onclick = function(){
		if(checkPhone(this.phone.value)){
			this.SetTime();
			this.obj.onclick = null;
			mui.ajax(url+'/sendsms',{
				data:{
					phone: this.phone.value
				},
				type:'post',
				timeout:10000,  
				success:function(data){
//					plus.nativeUI.toast('发送成功！');
				},
				error:function(xhr,type,errorThrown){
//					plus.nativeUI.toast('发送失败！');
				}
			});
		}else {
			plus.nativeUI.toast('手机号格式有误！');
		}
	}.bind(this)
}

getCode.prototype.SetTime = function(){
	
	
	this.time--;
	this.obj.innerText = '重新发送' + this.time;
	this.timer = setTimeout(function(){
		if(this.time==0){
			this.Val();
			return;
		}
		this.SetTime();
	}.bind(this),1000)
	
}
