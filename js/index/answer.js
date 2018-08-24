
	
var type = 0;//判断单选多选
var pre = null;

var answer = function(data,ary,status){
	var zimu = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var last = document.querySelector('.last');
	var next = document.querySelector('.next');
	var len = data.length;
	var title = document.querySelector('.answer-title');
	var listBox = document.querySelector('.answer-list');
	
	if(data==''){
		document.querySelector('.desc').innerText = '暂无题目！';
		document.querySelector('.answer-card').classList.add('mui-hidden');
		return false;
	}
	var groupId = ary.groupId;
	var token = ary.token;
	
	last.classList.add('unlock');
	pre = 1;
	var first = data[pre-1];
	document.querySelector('.pre').innerText = pre ;
	document.querySelector('.totle').innerText = '/'+ len;
	
	var desc = document.querySelector('.desc');
	desc.innerText = '共'+ len +'题，总计100分'
	
	//答题记录保存
	for(var i=0;i<len;i++){
		var selectsLen = data[i].selects.length;
		status.push({
			sort_id: data[i].sort_id,
			ismany: data[i].ismany,
			id: data[i].id,
			selects: [],
			num: 0,
			answer: []
		})
		for(var j = 0;j<selectsLen;j++){
			status[i].selects.push(false);
		}
	}
	statu = status;
	
	if(status[pre-1].ismany==1){ 
		title.innerHTML = '<span>1.</span>' + first.question + '(多选题)';
	}else{
		title.innerHTML = '<span>1.</span>' + first.question;
	}
	
	//加载选项
	function loadSelects(id,status){
		var html = '';
		var pre = data[id-1];
		var fLen = pre.selects.length;
		for(var i=0;i<fLen;i++){ 
			if(status[id-1].selects[i]==true){
				html+= '<li class="active" data-id="'+ i +'"><i class="iconfont icon-'+ zimu[i] +'"></i><a>'+ pre.selects[i] +'</a></li>'
			}else{
				html+= '<li data-id="'+ i +'"><i class="iconfont icon-'+ zimu[i] +'"></i><a>'+ pre.selects[i] +'</a></li>'
			}
			
			
		}
		listBox.innerHTML = html;
		
	}
	loadSelects(pre,status);
	
	
	var preAnswer = document.querySelector('.pre'),
		totleAnswer = document.querySelector('.totle'),
		preAnswerNum = parseInt(preAnswer.innerText);
	
	last.addEventListener('click',function(){
		preAnswer.innerText = pre==1?1:pre-1;
		pre--;
		if(pre<1){
			pre=1;
		}
		mui.ajax(url+'/question/submitone',{
			data:{
				group_id: groupId,
				sort_id: status[pre].sort_id, 
				api_token: token,
				answer: status[pre].answer.join('|')
			},
			dataType:'json',
			type:'post',
			timeout:10000,
			success:function(data){
				
			},
			error:function(xhr,type,errorThrown){
		    	plus.nativeUI.closeWaiting();
		        plus.nativeUI.toast('服务器连接超时，请稍后再试');
			}
		});
		loadSelects(pre,status);
		if(pre==1){
			this.classList.add('unlock');
			if(status[pre-1].ismany==1){
				title.innerHTML = '<span>1.</span>' + first.question + '(多选题)';
			}else{
				title.innerHTML = '<span>1.</span>' + first.question;
			}
			next.classList.remove('unlock');
			return false;
		}
		if(status[pre-1].ismany==1){
			title.innerHTML = '<span>'+ pre +'.</span>' + data[pre-1].question + '(多选题)';
		}else{
			title.innerHTML = '<span>'+ pre +'.</span>' + data[pre-1].question;
		}
		next.classList.remove('unlock');
	});
	
	
	next.addEventListener('click',function(){
		pre++;
		preAnswer.innerText = pre>data.length?data.length:pre;
		pre=pre>data.length?data.length:pre;
		loadSelects(pre,status);
		if (pre==data.length) { 
			this.classList.add('unlock');
			title.innerHTML = '<span>'+ pre +'.</span>' + data[pre-1].question;
//			return false;
		}
		if(status[pre-1].ismany==1){
			title.innerHTML = '<span>'+ pre +'.</span>' + data[pre-1].question + '(多选题)';
		}else{
			title.innerHTML = '<span>'+ pre +'.</span>' + data[pre-1].question;
		}
		last.classList.remove('unlock');
		mui.ajax(url+'/question/submitone',{
			data:{
				group_id: groupId,
				sort_id: status[pre-2].sort_id, 
				api_token: token,
				answer: status[pre-2].answer.join('|')
			},
			dataType:'json',
			type:'post',
			timeout:10000,
			success:function(data){
				
			},
			error:function(xhr,type,errorThrown){
		    	plus.nativeUI.closeWaiting();
		        plus.nativeUI.toast('服务器连接超时，请稍后再试');
			}
		});
		mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);//100毫秒滚动到顶
	});
	
	//选项选择
	
	mui('.answer-list').on('click','li',function(){
		var index = this.getAttribute('data-id');
		
		
		if(status[pre-1].ismany==1){//多选
			if(this.classList.contains('active')){
				this.classList.remove('active');
				status[pre-1].selects[index] = false;
				status[pre-1].answer.splice(status[pre-1].answer.indexOf(parseInt(index)+1),1);
				if(status[pre-1].answer.length==0){
					status[pre-1].num=0;
				}
			}else{
				this.classList.add('active');
				status[pre-1].selects[index] = true;
				status[pre-1].num=1;
				status[pre-1].answer.push(parseInt(index)+1);
			}
		}else if(status[pre-1].ismany==0){//单选
			status[pre-1].answer = [];
			status[pre-1].selects = [false,false,false,false];
			this.classList.add('active');
			status[pre-1].selects[index] = true;
			status[pre-1].num=1;
			status[pre-1].answer.push(parseInt(index)+1);
			loadSelects(pre,status);
		}
	})
};






