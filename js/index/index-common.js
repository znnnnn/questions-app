

//二级分类处理
var showlist = function(token){ 
	var lis = document.querySelectorAll('.list li');
	var len = lis.length;
	var liW = window.width/len;
	var last = 0;
	preId = lis[0].getAttribute('data-id');
	for(var i=0;i<len;i++){
		lis[i].style.width = liW + 'px';
		lis[i].index = i;
		lis[i].addEventListener('click',function(){
			if(last==this.index){
				return false;
			}
			lis[last].classList.remove('active');
			last = this.index;
			lis[last].classList.add('active');
			preId = this.getAttribute('data-id');
			GetLevels(this.getAttribute('data-id'),token);
			
		},false)
	}
}



//获取关卡列表
var GetLevels = function(cateId,token){
	plus.nativeUI.showWaiting();
	mui.ajax(url+'/cate/'+ cateId +'/groups',{
		data:{
			api_token: token
		},
		dataType:'json',
		type:'get',//HTTP请求类型
		timeout:10000,//超时时间设置为10秒；             
		success:function(data){
			if(data.status==0){
				ShowLevels(data.data,cateId,token);
			}else{
				plus.nativeUI.toast('数据请求失败 ！')
			}
			
//			showCateList(cateList);
		},
		error:function(xhr,type,errorThrown){
	    	plus.nativeUI.closeWaiting();
	        plus.nativeUI.toast('服务器连接超时，请稍后再试');
		}
	});
}

//管卡列表处理
var ShowLevels = function(data,cateId,token){
	
	var box = document.querySelector('.mui-scroll');
	box.innerHTML = '';
	var len = data.length;
	var html='';
	var diff = '<i class="iconfont icon-xunzhang active" style="font-size:20px;margin-right:2px;"></i>',
		difs = '<i class="iconfont icon-xunzhang" style="font-size:20px;margin-right:2px;color:#cccccc"></i>';
	
	if(data==''){
		box.innerHTML = '<a class="tip">暂无关卡</a>';
		return false
	}
	for (var i=0;i<len;i++) {
		var groupId = data[i].id,
			name = data[i].name,
			dif = data[i].difficulty,
			able = data[i].able,
			grade = data[i].grade==null?0:data[i].grade;
		var difff = '';
		
		if(dif==1){
			difff = `${diff}${difs}${difs}`;
		}else if(dif==2){
			difff = `${diff}${diff}${difs}`;
		}else if(dif==3){
			difff = `${diff}${diff}${diff}`;
		}else{
			difff = `${difs}${difs}${difs}`;
		}
		
		if(able==1){
			html+=	`<ul data-id=${groupId}>
						<li>
							${difff}
						</li>
						<li>
							<a>${name}</a>
							<a>${grade}</a>
						</li>
					</ul>`;
		}else if(able==0){
			html+=	`<ul class="lock" data-id=${groupId}>
						<li>
							${difff}
						</li>
						<li>
							<a>${name}</a>
							<a>${grade}</a>
						</li>
					</ul>`;
		}else{
			
		}
	}
	
	box.innerHTML += html;
	var Levels = document.querySelectorAll('.mui-scroll ul');
	var LevelLen = Levels.length;
	
	//var sw = true;
	for (var i =0;i<LevelLen;i++) {
		Levels[i].addEventListener('click',function(){
			
			if(index==3&&(this.classList.contains('lock'))){
				plus.nativeUI.toast('答题已结束！');
				return false;
			}
			if((this.classList.contains('lock'))){
				plus.nativeUI.toast('请先完成上一关卡！');
				return false;
			}
			if((this.classList.contains('nostart'))){
				plus.nativeUI.toast('未到开放时间！');
				return false;
			}
			
			mui.openWindow({
			  	url: 'answer.html',
			  	id: 'answer',
		  	 	extras:{
		  	 		cateId: cateId,
			      	groupId: this.getAttribute('data-id'),
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
			
			
		},false)
	}
	
	document.querySelector('.mui-content').classList.remove('mui-hidden');
	document.querySelector('.mui-scroll-wrapper').classList.remove('mui-hidden');
	plus.nativeUI.closeWaiting();
}




//行业类		
function showSelect(data){
	var box = document.querySelector('.box .choose-list');
//	box.innerHTML = '';
	var len = data.length;
	var html = '';
	for (var i=0;i<len;i++) {
		var id = data[i].id,
			name = data[i].name;
		if(i==0){
			html+='<a class="active" data-id="'+ id +'">'+ name +'</a>';
		}else{
			html+='<a data-id="'+ id +'">'+ name +'</a>';
		}
	}
	box.innerHTML = html;
	
	var a = document.querySelectorAll('.choose-list a');
	var len = a.length;
	for(var i=0;i<len;i++){
		a[i].index = i;
	}
	var pre = 0;
	var Id = data[0].id;
	mui('.choose-list').on('click','a',function(){
		var id = this.getAttribute('data-id');
		a[pre].classList.remove('active');
		this.classList.add('active');
		pre = this.index;
		Id = id;
	})
	
	document.querySelector('.btn').addEventListener('click',function(){
		
	})
}

function showAllList(data){
	
	
	var box = document.querySelector('.box');
//	if(data==''){
//		box.innerHTML = '<a class="tip">暂无数据</a>';
//		plus.nativeUI.closeWaiting();
//		return false;
//	}
//	box.innerHTML = '';
	var process = '',
		nostart = '',
		lock = '';
	
	var time = new Date().getTime();
	
	var len = data.length;
	for(var i=0;i<len;i++){
		var groupId = data[i].id,
			name = data[i].name,
			cate_name = data[i].cate_name,
			cateId = data[i].cate_id,
			sTime = data[i].start_time==null?0:data[i].start_time,
			eTime = data[i].expire_time==null?0:data[i].expire_time;
			
		var nsTime = new Date(sTime).getTime(),
			neTime = new Date(eTime).getTime();
			
		if(time<nsTime){
			nostart+=`<ul class="nostart" data-gid=${groupId} data-cid=${cateId}>
						<li>
							<a class="title">${name}</a>
						</li>
						<li>
							<a class="time">时间${sTime}/${eTime}</a>
							<a class="lable">${cate_name}</a>
						</li>
					</ul>`;
		}else if(time<neTime){
			process+=`<ul class="process" data-gid=${groupId} data-cid=${cateId}>
						<li>
							<a class="title">${name}</a>
						</li>
						<li>
							<a class="time">时间${sTime}/${eTime}</a>
							<a class="lable">${cate_name}</a>
						</li>
					</ul>`;
		}else{
			lock+=`<ul class="lock" data-gid=${groupId} data-cid=${cateId}>
						<li>
							<a class="title">${name}</a>
						</li>
						<li>
							<a class="time">时间${sTime}/${eTime}</a>
							<a class="lable">${cate_name}</a>
						</li>
					</ul>`;
		}
	}
	html = process+nostart+lock;
//	box.innerHTML=html;
	
	var lis = document.querySelectorAll('.mui-scroll ul');
	var liLen = lis.length;
	
	for(var i=0;i<liLen;i++){
		lis[i].addEventListener('click',function(){
			
			if(this.classList.contains('process')){
				if(this.querySelector('.lable').innerText!=userInd){
					plus.nativeUI.toast('您没有答题权限！');
					return false;
				}
				mui.openWindow({
				  	url: 'answer.html',
				  	id: 'answer',
			  	 	extras:{
			  	 		cateId: this.getAttribute('data-cid'),
				      	groupId: this.getAttribute('data-gid'),
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
			}else if(this.classList.contains('nostart')){
				plus.nativeUI.toast('答题未开放！');
			}else if(this.classList.contains('lock')){
				plus.nativeUI.toast('答题已结束，请到个人中心查看成绩！');
			}
			
			
		})
	}
	
	plus.nativeUI.closeWaiting();
}







//动态构造二级分类列表
var showList = function(arr){
	this.arr=arr;
	this.ul = document.querySelector('.list ul');
	this.len = arr.length;
	this.LiWrite(arr);
}

showList.prototype.LiWrite = function(){
	var oFragmeng = document.createDocumentFragment();
	for(var i=0;i<this.len;i++){
		var oli = document.createElement('li');
		if(i==0){
			oli.classList.add('active');
		}
		var oa = document.createElement('a');
    	var oText = document.createTextNode(this.arr[i]); 
		oa.appendChild(oText);
		oli.appendChild(oa);
		this.LiW(oli);
		oFragmeng.appendChild(oli);
	}
	this.ul.appendChild(oFragmeng);
	var lis = document.querySelectorAll('.list li');
	this.LiClick(lis);
}
showList.prototype.LiW = function(obj){
	liW = window.width/this.len;
	obj.style.width = liW+'px';
}
showList.prototype.LiClick = function(obj){
	var last = 0;
	var objLen = obj.length;
	for (var i=0;i<objLen;i++ ) {
		obj[i].index = i;
		obj[i].addEventListener('click',function(){
			var num=0;
			var html = [];
			
			if(this.index==0){
				showAllList(Data); 
			}
			
			if(this.index==1){
				
				var len = Data.length;
				if(len==0){
					obj[last].classList.remove('active');
					last = this.index;
					obj[last].classList.add('active');
					return false;
				}
				picker.show(function(SelectedItem) {
					
					var txt = SelectedItem[0].text;
					for (var i=0;i<len;i++) {
						
						if(txt==Data[i].cate_name){
							html.push(Data[i]);
						}
						
					}
					showAllList(html); 
				});
			}
			
			if(this.index==2){
				var txt = this.innerText;
				var len = Data.length;
				for (var i=0;i<len;i++) {
					if(txt==Data[i].cate_name){
						html.push(Data[i]);
					}
				}
				showAllList(html); 
			}
			
			
			
			if(last==this.index){
				return false;
			}
			obj[last].classList.remove('active');
			last = this.index;
			obj[last].classList.add('active');
			
			
		},false)
	}
}



var picker = null;
function selectInd(data){
	picker = new mui.PopPicker();
	picker.setData(data);
}