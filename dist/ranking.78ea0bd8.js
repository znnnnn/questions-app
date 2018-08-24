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
})({"js\\ranking\\index.js":[function(require,module,exports) {
//下拉刷新

function pullfresh() {
	setTimeout(function () {
		//业务逻辑


		mui('#rank').pullRefresh().endPulldownToRefresh();
		mui.toast('刷新成功');
	}, 1000);
}

//
var rank = document.querySelector('#rank'),
    bodyH = document.body.offsetHeight,
    headerH = document.querySelector('.header').offsetHeight,
    categoryH = document.querySelector('.category').offsetHeight,
    rankH = rank.offsetHeight;
rank.style.height = bodyH - headerH - categoryH + 'px';

var aBtns = null;
function TabSwitch(id) {
	var obj = document.querySelector(id);
	this.activeNum = 0; //当前活动的按钮
	this.aBtns = obj.querySelectorAll('li'); //全局变量 转变成属性
	this.a = obj.querySelectorAll('a');
	this.len = this.aBtns.length;
	var _this = this; //将这里的对象this存入_this中，方便在按钮点击里面用
	for (i = 0; i < this.len; i++) {
		this.aBtns[i].index = i;
		this.aBtns[i].onclick = function () {
			_this.tab(this); //这里的this指的是按钮，把它作为参数传到函数中；
			_this.getList(this.index);
			_this.activeNum = this.index;
		};
	}
}
TabSwitch.prototype.tab = function (aBtn) {
	//函数 转变成对象的方法
	for (i = 0; i < this.len; i++) {
		this.a[i].className = '';
	}
	aBtn.querySelector('a').className = 'active';
};

//请求数据
var mask = mui.createMask();
TabSwitch.prototype.getList = function (index) {
	//if(this.activeNum != index){ //避免多次点击

	plus.nativeUI.showWaiting();
	if (index == 3) {
		loadrank();
	} else {
		loadrank(index + 1);
	}
	//}
};

function showRank(data) {

	var userRank = document.querySelector('.user-rank-info');
	var allRank = document.querySelector('.top-ten ul');
	var showLen = 8;

	var myRank = data.my,
	    allRank = data.rank;

	userRank.innerHTML = '';
	document.querySelector('.top-ten ul').innerHTML = '';

	if (allRank.length == '') {
		document.querySelector('.top-ten ul').innerHTML = '<a class="tip">未查询到排行数据！</a>';
		plus.nativeUI.closeWaiting();
		return false;
	}

	var len = allRank.length;

	var myphone = myRank.phone,
	    myscore = myRank.sum_score,
	    myrank = myRank.rank;

	if (myRank == '') {
		userRank.innerHTML = '';
		//		userRank.innerHTML = `
		//			<div class="rank-info">
		//				<a>我</a>
		//				<a><span>${myphone}</span><span>暂无排名</span></a>
		//				<a>0</a>
		//			</div>
		//			<div></div>
		//		`;
	} else {
		userRank.innerHTML = '\n\t\t\t<div class="rank-info">\n\t\t\t\t<a>\u6211</a>\n\t\t\t\t<a><span>' + myphone + '</span><span>\u7B2C' + myrank + '\u540D</span></a>\n\t\t\t\t<a>' + myscore + '</a>\n\t\t\t</div>\n\t\t\t<div></div>\n\t\t';
	}

	if (allRank == '') {
		allRank.innerHTML = '<a class="tip">未查询到排行数据！</a>';
	} else {
		var html = '';
		for (var i = 0; i < 8; i++) {
			if (i == len) {
				break;
			}
			var phone = allRank[i].phone,
			    score = allRank[i].sum_score;
			html += '<li>\n\t\t\t\t\t\t<div class="rank-info">\n\t\t\t\t\t\t\t<a>' + (i + 1) + '</a>\n\t\t\t\t\t\t\t<a>' + phone + '</a>\n\t\t\t\t\t\t\t<a>' + score + '</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>';
		}
		document.querySelector('.top-ten ul').innerHTML = html;
	}
	document.querySelector('#rank').classList.remove('mui-hidden');
	plus.nativeUI.closeWaiting();
}
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
},{}]},{},["node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","js\\ranking\\index.js"], null)
//# sourceMappingURL=/ranking.78ea0bd8.map