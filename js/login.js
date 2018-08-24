//切换登录方式
(function(){
	var change = document.querySelector('#change'),
		rows = document.querySelectorAll('.mui-input-row');
		sw = true;	
	
	change.addEventListener('click',function(){
		if(sw){
			change.innerText = '用账号密码登录';
			rows[1].classList.add('mui-hidden');
			rows[2].classList.remove('mui-hidden');
		}else{
			change.innerText = '用短信验证码登录';
			rows[1].classList.remove('mui-hidden');
			rows[2].classList.add('mui-hidden');
		}
		sw=!sw;
	},false)
	
})();


