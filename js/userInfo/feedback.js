/*!
 * ======================================================
 * FeedBack Template For MUI (http://dev.dcloud.net.cn/mui)
 * =======================================================
 * @version:1.0.0
 * @author:cuihongbao@dcloud.io
 */
(function() {
	var index = 1;
	var size = null;
	var imageIndexIdNum = 0;
	var starIndex = 0;
	var feedback = {
		question: document.getElementById('question'), 
		imageList: document.getElementById('image-list'),
		contact: document.getElementById('contact'), 
		submitBtn: document.getElementById('submit')
	};
	feedback.files = null;//[];
	feedback.uploader = null;  
	feedback.deviceInfo = null; 
	mui.plusReady(function() {
		var last = plus.webview.currentWebview();
		token = last.token;
		//设备信息，无需修改
		feedback.deviceInfo = {
			appid: plus.runtime.appid, 
			imei: plus.device.imei, //设备标识
			images: feedback.files, //图片文件
			p: mui.os.android ? 'a' : 'i', //平台类型，i表示iOS平台，a表示Android平台。
			md: plus.device.model, //设备型号
			app_version: plus.runtime.version,
			plus_version: plus.runtime.innerVersion, //基座版本号
			os:  mui.os.version,
			net: ''+plus.networkinfo.getCurrentType()
		}
	});
	/**
	 *提交成功之后，恢复表单项 
	 */
	feedback.clearForm = function() {
		feedback.question.value = '';
		feedback.contact.value = '';
		feedback.imageList.innerHTML = '';
		feedback.newPlaceholder();
		feedback.files = [];
		index = 0;
		size = 0;
		imageIndexIdNum = 0;
		starIndex = 0;
	};
	feedback.getFileInputArray = function() {
		return [].slice.call(feedback.imageList.querySelectorAll('.file'));
	};
	feedback.addFile = function(path) {
//		feedback.files.push({name:"images"+index,path:path});
		feedback.files = {path:path};
		index++;
	};
	/**
	 * 初始化图片域占位
	 */
	feedback.newPlaceholder = function() {
		var fileInputArray = feedback.getFileInputArray();
		if (fileInputArray &&
			fileInputArray.length > 0 &&
			fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
			return;
		};
		imageIndexIdNum++;
		var placeholder = document.createElement('div');
		placeholder.setAttribute('class', 'image-item space');
		//删除图片
		var closeButton = document.createElement('div');
		closeButton.setAttribute('class', 'image-close');
		closeButton.innerHTML = 'X';
		//小X的点击事件
		closeButton.addEventListener('tap', function(event) {
			setTimeout(function() {
				feedback.imageList.removeChild(placeholder);
			}, 0);
			return false;
		}, false);
		
		//
		var fileInput = document.createElement('div');
		fileInput.setAttribute('class', 'file');
		fileInput.setAttribute('id', 'image-' + imageIndexIdNum);
		fileInput.addEventListener('tap', function(event) {
			var self = this;
			var index = (this.id).substr(-1);
			
			plus.gallery.pick(function(e) {
				var name = e.substr(e.lastIndexOf('/') + 1);
				plus.zip.compressImage({
					src: e,
					dst: '_doc/' + name,
					overwrite: true,
					quality: 50
				}, function(zip) {
					size += zip.size  
//					console.log("filesize:"+zip.size+",totalsize:"+size);
					if (size > (10*1024*1024)) {
						return mui.toast('文件超大,请重新选择~');
					}
					if (!self.parentNode.classList.contains('space')) { //已有图片
						feedback.files.splice(index-1,1,{name:"images"+index,path:e});
					} else { //加号
						placeholder.classList.remove('space');
						feedback.addFile(zip.target);
						feedback.newPlaceholder();
					}
					placeholder.style.backgroundImage = 'url(' + zip.target + ')';
				}, function(zipe) {
					mui.toast('压缩失败！')
				});
				

				
			}, function(e) {
//				mui.toast(e.message);
			},{});
		}, false);
		placeholder.appendChild(closeButton);
		placeholder.appendChild(fileInput);
		feedback.imageList.appendChild(placeholder);
	};
	feedback.newPlaceholder();
	feedback.submitBtn.addEventListener('tap', function(event) {
		if (feedback.question.value == '' ||
			(feedback.contact.value != '' &&
				feedback.contact.value.search(/^(\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+)|([1-9]\d{4,9})$/) != 0)) {
			return mui.toast('信息填写不符合规范');
		}
		if (feedback.question.value.length > 200 || feedback.contact.value.length > 200) {
			return mui.toast('信息超长,请重新填写~')
		}
		//判断网络连接
//		if(plus.networkinfo.getCurrentType()==plus.networkinfo.CONNECTION_NONE){
//			return mui.toast("连接网络失败，请稍后再试");
//		}
		feedback.send({
			content: feedback.question.value,
			img: feedback.files,
			comms: feedback.contact.value,
			api_token: token
		}) 
		

	}, false)
	feedback.send = function(content) {
		mui.ajax(url+'/feedback/create',{
			data:{
				content: content.content,
//				'img[]': content.img,
				api_token: content.api_token,
				comms: content.comms,
			},
			dataType:'json',
			type:'post',
			timeout:10000,
			success:function(data){
			},
			error:function(xhr,type,errorThrown){
//				console.log(xhr);
			}
		});
		
//		feedback.uploader = plus.uploader.createUpload(url+'/feedback/create', {
//			method: 'POST'
//		}, function(upload, status) {
////			console.log(token);
//			plus.nativeUI.closeWaiting()
////			console.log("upload :"+upload.responseText);
//			console.log(upload.responseText);
////			if(status==200){
////				var data = JSON.parse(upload.responseText);
////				//上传成功，重置表单
////				if (data.ret === 0 && data.desc === 'Success') {
////					console.log("upload success");
////				}
////			}else{
////				console.log("upload fail");
////			} 
//		});
//		//添加上传数据
//		mui.each(content, function(index, element) {
//			if (index != 'img') {
//				console.log(index+":"+element);
//				feedback.uploader.addData(index, element);
//			} 
//		});
//		//添加上传文件
//		mui.each(feedback.files, function(index, element) {
//			var f = feedback.files[index];
//			console.log("addFile:"+JSON.stringify(f));
//			feedback.uploader.addFile(f.path, {
//				key: 'img'
//			});
////			console.log(f.path)
//		});
//		for (let x in feedback.uploader.responseText) {
//			console.log(x)
//		}
		//开始上传任务
//		feedback.uploader.start();
//		mui.alert("感谢反馈，点击确定关闭","问题反馈","确定",function () {
//			feedback.clearForm();
//		},'div');
	};
	
  	
})();