// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js\\userInfo\\index.js":[function(require,module,exports) {
var index = null;

var phone = document.querySelector('span.phone'),
    integral = document.querySelector('span.integral'),
    industry = document.querySelector('span.industry');

var token = null;
var data = null;
var getInfo = null;

window.addEventListener('getToken', function (e) {
	var state = app.getState();
	token = state.token;
	//		plus.nativeUI.showWaiting(null,{back:'none'});
	//		token = e.detail.token;
	mui.ajax(url + '/user/info', {
		data: {
			api_token: token
		},
		dataType: 'json',
		type: 'get',
		timeout: 10000,
		success: function success(data) {
			phone.innerText = data.data.phone;
			integral.innerText = '暂未开放';
			industry.innerText = data.data.career.name;
			changeIndustry(token);
			plus.nativeUI.closeWaiting();
		},
		error: function error(xhr, type, errorThrown) {
			plus.nativeUI.closeWaiting();
			plus.nativeUI.toast('服务器连接超时，请稍后再试');
		}
	});
});

var List = [];
var cheIns = document.querySelector('#cheIns');
var ins = document.querySelector('span.industry');
function changeIndustry(token) {
	mui.ajax(url + '/career/list', {
		data: {
			api_token: token
		},
		dataType: 'json',
		type: 'get',
		timeout: 10000,
		success: function success(data) {
			if (data.status == 0) {
				List = [];
				var len = data.data.length;
				for (var i = 0; i < len; i++) {
					List.push({
						value: data.data[i].id,
						text: data.data[i].name
					});
				}
				showList(List);
			}
		},
		error: function error(xhr, type, errorThrown) {
			plus.nativeUI.closeWaiting();
			plus.nativeUI.toast('服务器连接超时，请稍后再试');
		}
	});
}

var picker = new mui.PopPicker();
function showList(data) {
	picker.setData(data);
	cheIns.addEventListener('click', function () {
		var oldText = ins.innerText;
		picker.show(function (SelectedItem) {

			var newText = SelectedItem[0].text;
			if (oldText == newText) {
				ins.innerText = oldText;
			} else {
				mui.ajax(url + '/user/selectcareer', {
					data: {
						api_token: token,
						career_id: SelectedItem[0].value
					},
					dataType: 'json',
					type: 'post',
					timeout: 10000,
					success: function success(data) {
						if (data.status == 0) {
							plus.nativeUI.toast('行业修改成功！');
							ins.innerText = newText;
						} else {
							plus.nativeUI.toast('行业修改失败！');
						}
					},
					error: function error(xhr, type, errorThrown) {
						plus.nativeUI.closeWaiting();
						plus.nativeUI.toast('服务器连接超时，请稍后再试');
					}
				});
			}
		});
	});
}

window.addEventListener('pickerHide', function () {
	//	picker.hide();
});

mui('.mui-content').on('click', 'li.li-item', function () {
	var title = this.querySelector('a').innerText;
	var hr = this.getAttribute('data-hr');
	mui.openWindow({
		url: hr,
		id: hr,
		extras: {
			title: title,
			token: token
		},
		createNew: false,
		show: {
			aniShow: 'slide-in-right' //页面显示动画，默认为”slide-in-right“；
		},
		waiting: {
			autoShow: true, //自动显示等待框，默认为true
			title: '正在加载...' //等待对话框上显示的提示内容
		}
	});
});

document.getElementById('exit').addEventListener('tap', function () {
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
	}, function (event) {
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

var GetUserInfo = function GetUserInfo(data) {
	this.InfoList = {};
	this.data = data;
	this.GetPhone();
	this.GetIntegral();
	this.GetIndustry();
	return this.InfoList;
};

GetUserInfo.prototype.GetPhone = function () {
	//获取手机
	var phone = this.data.phone;
	this.InfoList.phone = phone;
};
GetUserInfo.prototype.GetIntegral = function () {
	//获取积分
	var integral = '暂未开放';
	this.InfoList.integral = integral;
};
GetUserInfo.prototype.GetIndustry = function () {
	//获取行业
	var industry = this.data.career.name;
	this.InfoList.industry = industry;
};
},{}],"node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = undefined || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '14324' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","js\\userInfo\\index.js"], null)
//# sourceMappingURL=/userInfo.f489920f.map