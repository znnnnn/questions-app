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
})({"js\\index\\index.js":[function(require,module,exports) {

var indexCate = null;

var getCateInfo = function getCateInfo(data) {
	plus.nativeUI.showWaiting();
	var len = data.length;
	var html = '';
	//处理分类列表
	for (var i = 0; i < len; i++) {

		var cate = data[i],
		    //获取当前分类所有信息
		cateId = cate.id;
		cateName = cate.name; //获取当前分类名


		if (i == 3) {
			//获取当前分类描述
			cateMark = '';
		} else {
			cateMark = '(' + cate.mark + ')';
		}

		var allNum = cate.quesion_allnum,
		    //获取题目总数
		passNum = cate.pass_num; //获取通过题目总数
		var subCates = cate.sub,
		    //获取当前分类的子分类 
		subLen = subCates.length; //获取当前分类的子分类数量


		//处理子分类列表
		var labls = '';
		if (i != 3) {
			for (var j = 0; j < subLen; j++) {

				var subName = subCates[j].name; //获取子分类名
				labls += '<a>' + subName + '</a>';
			}
		}

		var img = '<img src="../images/index/' + cates[i] + '.png"/>';
		var mark = '';

		if (i == 3) {
			mark = '<a>' + cateName + '</a>';
		} else {
			mark = '<a>' + cateName + '</a><a>' + cateMark + '</a>';
		}

		html += '<div class="category" >\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li class="infor">\n\t\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t\t<li class="icon"><a>' + img + '</a></li>\n\t\t\t\t\t\t\t\t\t<li class="category">' + mark + '</li>\n\t\t\t\t\t\t\t\t\t<li class="score"><a><span class="grade">' + passNum + '</span>/<span class="sum">' + allNum + '</span></a></li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<div class="lable">\n\t\t\t\t\t\t\t' + labls + '\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="mui-hidden cateId">' + cateId + '</div>\n\t\t\t\t\t\t<div class="mui-hidden title">' + cateName + cateMark + '</div>\n\t\t\t\t\t</div>';
	}

	box.innerHTML = html;
	cateClick();
};

var cateClick = function cateClick() {
	//顶级分类点击事件
	var category = document.querySelectorAll('div.category');
	var categoryL = category.length;

	for (var i = 0; i < categoryL; i++) {
		category[i].index = i;
	}

	mui('#category').on('click', 'div.category', function () {
		var cateId = this.querySelector('.cateId').innerText;
		var title = this.querySelector('.title').innerText;
		var urls = ['common.html', 'common.html', 'common.html', 'industry.html'];
		var index = this.index;

		mui.openWindow({
			url: 'index/' + urls[this.index],
			id: urls[this.index],
			extras: {
				cateId: cateId,
				title: title,
				index: index,
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
};

window.addEventListener('getList', function (e) {
	//获得顶级分类
	num++;
	var state = app.getState();

	if (e.detail.token) {
		token = e.detail.token;
	} else {
		token = state.token;
	}

	mui.ajax(url + '/index/cate', {
		data: {
			api_token: token
		},
		dataType: 'json',
		type: 'get',
		timeout: 10000,
		success: function success(data) {
			if (data.status == 0) {
				indexCate = data.data;
				getCateInfo(data.data);
			} else {
				plus.nativeUI.toast('数据请求失败 ！');
			}
			plus.nativeUI.closeWaiting();
		},
		error: function error(xhr, type, errorThrown) {
			plus.nativeUI.closeWaiting();
			plus.nativeUI.toast('服务器连接超时，请稍后再试');
		}
	});
});
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
},{}]},{},["node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","js\\index\\index.js"], null)
//# sourceMappingURL=/index.11595c8a.map