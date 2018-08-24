//下拉刷新

function pullfresh(){
	setTimeout(function(){
		//业务逻辑
		
		
		mui('#rank').pullRefresh().endPulldownToRefresh();
		mui.toast('刷新成功');
	},1000)
}


//
var rank = document.querySelector('#rank'),
	bodyH = document.body.offsetHeight,
	headerH = document.querySelector('.header').offsetHeight,
	categoryH = document.querySelector('.category').offsetHeight,
	rankH = rank.offsetHeight;
	rank.style.height = bodyH - headerH - categoryH + 'px';


var aBtns = null;
function TabSwitch(id){
    var obj = document.querySelector(id);
    this.activeNum = 0;//当前活动的按钮
    this.aBtns = obj.querySelectorAll('li');//全局变量 转变成属性
    this.a = obj.querySelectorAll('a');
    this.len = this.aBtns.length;
    var _this =this;//将这里的对象this存入_this中，方便在按钮点击里面用
    for(i=0;i<this.len;i++){
        this.aBtns[i].index = i;
        this.aBtns[i].onclick = function () {
            _this.tab(this);//这里的this指的是按钮，把它作为参数传到函数中；
            _this.getList(this.index);
    		_this.activeNum = this.index;
        } 
    }
}
TabSwitch.prototype.tab = function (aBtn){//函数 转变成对象的方法
    for(i=0;i<this.len;i++){
        this.a[i].className = '';
    }
    aBtn.querySelector('a').className = 'active';
}

//请求数据
var mask=mui.createMask();
TabSwitch.prototype.getList = function (index){
	//if(this.activeNum != index){ //避免多次点击
		
    	plus.nativeUI.showWaiting();
		if(index==3){
			loadrank();
		}else{
			loadrank(index+1);
		}
	//}
}


function showRank(data){
	
	var userRank = document.querySelector('.user-rank-info');
	var allRank = document.querySelector('.top-ten ul');
	var showLen = 8;
	
	var myRank = data.my,
		allRank = data.rank;
	
	userRank.innerHTML ='';
	document.querySelector('.top-ten ul').innerHTML = '';
	
	if(allRank.length==''){
		document.querySelector('.top-ten ul').innerHTML = '<a class="tip">未查询到排行数据！</a>';
		plus.nativeUI.closeWaiting();
		return false;
	}
	
	var len = allRank.length;
	
	var myphone = myRank.phone,
		myscore = myRank.sum_score,
		myrank = myRank.rank;
	
	if(myRank==''){
		userRank.innerHTML ='';
//		userRank.innerHTML = `
//			<div class="rank-info">
//				<a>我</a>
//				<a><span>${myphone}</span><span>暂无排名</span></a>
//				<a>0</a>
//			</div>
//			<div></div>
//		`;
	}else{
		userRank.innerHTML = `
			<div class="rank-info">
				<a>我</a>
				<a><span>${myphone}</span><span>第${myrank}名</span></a>
				<a>${myscore}</a>
			</div>
			<div></div>
		`;
	}
	
	if(allRank==''){
		allRank.innerHTML = '<a class="tip">未查询到排行数据！</a>';
	}else{
		var html='';
		for (var i=0;i<8;i++) {
			if(i==len){
				break;
			}
			var phone = allRank[i].phone,
				score = allRank[i].sum_score;
			html+=	`<li>
						<div class="rank-info">
							<a>${i+1}</a>
							<a>${phone}</a>
							<a>${score}</a>
						</div>
					</li>`;
		}
		document.querySelector('.top-ten ul').innerHTML = html;
	}
	document.querySelector('#rank').classList.remove('mui-hidden');
	plus.nativeUI.closeWaiting();
}
