
var indexCate = null;

var getCateInfo = function(data){
	plus.nativeUI.showWaiting()	
	var len = data.length;
	var html='';
	//处理分类列表
	for (var i=0;i<len;i++) { 
		
		var cate = data[i], //获取当前分类所有信息
			cateId = cate.id;
			cateName = cate.name;  //获取当前分类名
		
			
		if(i==3){//获取当前分类描述
			cateMark = '';
		}else{
			cateMark = '('+ cate.mark + ')';
		}
			
		var allNum = cate.quesion_allnum, //获取题目总数
			passNum = cate.pass_num; //获取通过题目总数
		var subCates = cate.sub, //获取当前分类的子分类 
			subLen = subCates.length; //获取当前分类的子分类数量
			
		
		//处理子分类列表
		var labls = '';
		if(i!=3){
			for (var j=0;j<subLen;j++) {
			
				var subName = subCates[j].name; //获取子分类名
				labls+=`<a>${subName}</a>`;
				
			}
		}
		
		var img = '<img src="../images/index/'+cates[i]+'.png"/>';
		var mark = '';
		
		if(i==3){
			mark = `<a>${cateName}</a>`;
		}else{
			mark = `<a>${cateName}</a><a>${cateMark}</a>`;
		}
		
		html += `<div class="category" >
						<ul>
							<li class="infor">
								<ul>
									<li class="icon"><a>${img}</a></li>
									<li class="category">${mark}</li>
									<li class="score"><a><span class="grade">${passNum}</span>/<span class="sum">${allNum}</span></a></li>
								</ul>
							</li>
						</ul>
						<div class="lable">
							${labls}
						</div>
						<div class="mui-hidden cateId">${cateId}</div>
						<div class="mui-hidden title">${cateName}${cateMark}</div>
					</div>`;
		
	}
	
	
	box.innerHTML=html;
	cateClick();
}

var cateClick = function(){//顶级分类点击事件
	var category = document.querySelectorAll('div.category');
	var categoryL = category.length;
	
	for (var i = 0;i<categoryL;i++) {
		category[i].index = i;
	}
	
	mui('#category').on('click', 'div.category', function() {
		var cateId = this.querySelector('.cateId').innerText;
		var title = this.querySelector('.title').innerText;
		var urls = ['common.html','common.html','common.html','industry.html'];
		var index = this.index;
		
		mui.openWindow({
		  	url: 'index/' + urls[this.index],
		  	id: urls[this.index],
	  	 	extras:{
	  	 		cateId: cateId,
		      	title: title,
	      		index: index,
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
}

window.addEventListener('getList',function(e){//获得顶级分类
	num++;
	var state = app.getState();
	
	if(e.detail.token){
		token = e.detail.token;
	}else{
		token = state.token;
	}
	
	mui.ajax(url+'/index/cate',{
		data:{
			api_token: token
		},
		dataType:'json',
		type:'get',
		timeout:10000,          
		success:function(data){
			if(data.status==0){
				indexCate=data.data;
				getCateInfo(data.data);
			}else{
				plus.nativeUI.toast('数据请求失败 ！')
			}
			plus.nativeUI.closeWaiting();
		},
		error:function(xhr,type,errorThrown){
	    	plus.nativeUI.closeWaiting();
	        plus.nativeUI.toast('服务器连接超时，请稍后再试');
		}
	});


})