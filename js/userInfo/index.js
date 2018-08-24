var index = null;
			


var phone = document.querySelector('span.phone'),
	integral = document.querySelector('span.integral'),
	industry = document.querySelector('span.industry');
	
var token = null;
var data = null;
var getInfo = null;


window.addEventListener('getToken',function(e){
	var state = app.getState();
	token = state.token;
//		plus.nativeUI.showWaiting(null,{back:'none'});
//		token = e.detail.token;
	mui.ajax(url+'/user/info',{
		data:{
			api_token: token
		},
		dataType:'json',
		type:'get',
		timeout:10000,
		success:function(data){
			phone.innerText = data.data.phone;
			integral.innerText = '暂未开放';
			industry.innerText = data.data.career.name;
			changeIndustry(token);
			plus.nativeUI.closeWaiting();
		},
		error:function(xhr,type,errorThrown){
	    	plus.nativeUI.closeWaiting();
	        plus.nativeUI.toast('服务器连接超时，请稍后再试');
		}
	});
	
})


var List = [];
var cheIns = document.querySelector('#cheIns');
var ins = document.querySelector('span.industry');
function changeIndustry(token){
	mui.ajax(url+'/career/list',{
		data:{
			api_token: token
		},
		dataType:'json',
		type:'get',
		timeout:10000,
		success:function(data){
			if(data.status==0){
				List = [];
				var len = data.data.length;
				for (var i=0;i<len;i++) {
					List.push({
						value: data.data[i].id,
						text: data.data[i].name
					})
				}
				showList(List);
			}
		},
		error:function(xhr,type,errorThrown){
	    	plus.nativeUI.closeWaiting();
	        plus.nativeUI.toast('服务器连接超时，请稍后再试');
		}
	});
	
}

var picker = new mui.PopPicker(); 			
function showList(data){
	picker.setData(data);
	cheIns.addEventListener('click',function(){
		var oldText = ins.innerText;
		picker.show(function(SelectedItem) {
			
			var newText = SelectedItem[0].text;
			if(oldText==newText){
				ins.innerText = oldText;
			}else{
				mui.ajax(url+'/user/selectcareer',{
					data:{
						api_token: token,
						career_id: SelectedItem[0].value
					},
					dataType:'json',
					type:'post',
					timeout:10000,
					success:function(data){
						if(data.status==0){
							plus.nativeUI.toast('行业修改成功！');
							ins.innerText = newText;
						}else{
							plus.nativeUI.toast('行业修改失败！');
						}
					},
					error:function(xhr,type,errorThrown){
				    	plus.nativeUI.closeWaiting();
				        plus.nativeUI.toast('服务器连接超时，请稍后再试');
					}
				});
			}
		})
		
	});
}
			
window.addEventListener('pickerHide',function(){
//	picker.hide();
});



mui('.mui-content').on('click', 'li.li-item', function() {
	var title = this.querySelector('a').innerText;	 
	var hr = this.getAttribute('data-hr');
	mui.openWindow({
	  	url: hr,
	  	id: hr,
	 	extras:{
	      	title: title,
	      	token: token
	    },
	    createNew:false,
	  	show:{
	      	aniShow: 'slide-in-right',//页面显示动画，默认为”slide-in-right“；
	   	},
	   	waiting:{
      		autoShow:true,//自动显示等待框，默认为true
      		title:'正在加载...',//等待对话框上显示的提示内容
      	}
	});
});

document.getElementById('exit').addEventListener('tap', function() {
	if (mui.os.ios) {
		app.setState({});
		mui.openWindow({
			url: '../login.html',
			id: 'login',
			show: {
				aniShow: 'pop-in'
			},
			waiting: {
				autoShow: false
			}
		});
		return;
	}
	var btnArray = [{
		title: "注销当前账号"
	}];
	plus.nativeUI.actionSheet({
		cancel: "取消",
		buttons: btnArray
	}, function(event) {
		var index = event.index;
		switch (index) {
			case 1:
				//注销账号
				app.setState({});
				plus.webview.getLaunchWebview().show("pop-in");
				//若启动页不是登录页，则需通过如下方式打开登录页
//						mui.openWindow({
//							url: 'login.html',
//							id: 'login',
//							show: {
//								aniShow: 'pop-in'
//							}
//						});
				break;
		}
	});
}, false);



var GetUserInfo = function(data){
	this.InfoList = {};
	this.data=data;
	this.GetPhone();
	this.GetIntegral();
	this.GetIndustry();
	return this.InfoList;
}

GetUserInfo.prototype.GetPhone = function(){//获取手机
	var phone = this.data.phone;
	this.InfoList.phone = phone;
}
GetUserInfo.prototype.GetIntegral = function(){//获取积分
	var integral = '暂未开放'
	this.InfoList.integral = integral;
}
GetUserInfo.prototype.GetIndustry = function(){//获取行业
	var industry = this.data.career.name;
	this.InfoList.industry = industry;
}