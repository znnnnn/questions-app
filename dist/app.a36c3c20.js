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
})({"js\\app.js":[function(require,module,exports) {
/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function ($, owner) {
  /**
  * 用户登录
  **/
  owner.login = function (loginInfo, callback) {
    if (loginInfo.token != null) {
      plus.nativeUI.showWaiting('加载中...');
      mui.ajax(url + '/user/info', {
        data: {
          api_token: loginInfo.token
        },
        dataType: 'json',
        type: 'get',
        timeout: 10000,
        success: function success(data) {
          toMain();
        },
        error: function error(xhr, type, errorThrown) {
          app.setState({});
          plus.nativeUI.closeWaiting();
          plus.nativeUI.toast('自动登录失败，请重新登录');
        }
      });
      //			toMain();
      return false;
    }
    sw = !!pwdBox.classList.contains('mui-hidden');
    api = sw ? url + '/login/sms' : url + '/login';
    callback = callback || $.noop;
    loginInfo = loginInfo || {};
    loginInfo.account = loginInfo.account || '';
    loginInfo.password = loginInfo.password || '';
    if (!checkPhone(loginInfo.account)) {
      return callback('手机号格式错误！');
    }

    plus.nativeUI.showWaiting('登录中...');
    var accountBox = document.getElementById('account');

    var passwordBox = document.getElementById('password');

    var codeBox = document.getElementById('code');

    if (!sw) {
      // 密码登录
      if (loginInfo.password.length < 6) {
        plus.nativeUI.closeWaiting();
        return callback('密码最短为 6 个字符');
      }
      mui.ajax(url + '/login', {
        data: {
          phone: loginInfo.account,
          password: loginInfo.password
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function success(data) {
          plus.nativeUI.closeWaiting();

          if (data.status == 0) {
            app.createState(data.data.api_token, function () {
              toMain();
            });
            accountBox.value = '';
            passwordBox.value = '';
            return callback('登录成功！');
          } else {
            return callback(data.message);
          }
        },
        error: function error(xhr, type, errorThrown) {
          plus.nativeUI.closeWaiting();
          return callback('密码登录失败');
        }
      });
    } else {
      // 验证码登录
      if (checkCode(loginInfo.code)) {
        plus.nativeUI.closeWaiting();
        return callback('请填写验证码！');
      }
      mui.ajax(url + '/login/sms', {
        data: {
          phone: loginInfo.account,
          code: loginInfo.code
        },
        dataType: 'json',
        type: 'post',
        timeout: 5000,
        success: function success(data) {
          plus.nativeUI.closeWaiting();
          if (data.status == 0) {
            app.createState(data.data.api_token, function () {
              toMain();
            });
            accountBox.value = '';
            codeBox.value = '';
            return callback('登录成功！');
          } else {
            return callback(data.message);
          }
        },
        error: function error(xhr, type, errorThrown) {
          plus.nativeUI.closeWaiting();
          return callback('短信登录失败');
        }
      });
    }

    //
    //		var token = JSON.parse(localStorage.getItem('$users') || '[]');
    //		users.push(regInfo);
    //		localStorage.setItem('$users', JSON.stringify(users));
  };

  owner.createState = function (token, callback) {
    var state = owner.getState();
    state.token = token;
    owner.setState(state);
    return callback();
  };

  /**
  * 新用户注册
  **/
  owner.reg = function (regInfo, callback) {
    callback = callback || $.noop;
    regInfo = regInfo || {};
    regInfo.account = regInfo.account || '';
    regInfo.password = regInfo.password || '';
    if (!checkPhone(regInfo.account)) {
      return callback('手机号格式有误！');
    }
    if (checkCode(regInfo.code)) {
      return callback('请填写验证码！');
    }
    if (!checkPwd(regInfo.pwd)) {
      return callback('只允许以大小写字母开头，可包含数字及(_.@)！');
    }
    plus.nativeUI.showWaiting('waitng...');

    mui.ajax(url + '/register', {
      data: {
        code: regInfo.code,
        phone: regInfo.account,
        password: regInfo.pwd
      },
      dataType: 'json',
      type: 'post',
      timeout: 10000,
      success: function success(data) {
        plus.nativeUI.closeWaiting();

        if (data.status == 0) {
          //					plus.webview.getLaunchWebview().show("fade-in",200,function () {
          plus.webview.currentWebview().close('fade-out');
          //					});
          return callback('注册成功！');
        } else {
          return callback(data.message);
        }

        return callback(1);
      },
      error: function error(xhr, type, errorThrown) {
        plus.nativeUI.closeWaiting();
        return callback('注册失败！');
      }
    });

    //		var users = JSON.parse(localStorage.getItem('$users') || '[]');
    //		users.push(regInfo);
    //		localStorage.setItem('$users', JSON.stringify(users));
    //		return callback('注册成功！');
  };

  /**
  * 获取当前状态
  **/
  owner.getState = function () {
    var stateText = localStorage.getItem('$state') || '{}';
    return JSON.parse(stateText);
  };

  /**
  * 设置当前状态
  **/
  owner.setState = function (state) {
    state = state || {};
    localStorage.setItem('$state', JSON.stringify(state));
    var settings = owner.getSettings();
    settings.gestures = '';
    owner.setSettings(settings);
  };

  /**
  * 找回密码
  **/
  owner.forgetPassword = function (regInfo, callback) {
    callback = callback || $.noop;
    if (!checkPhone(regInfo.account)) {
      return callback('手机号格式有误！');
    }
    if (checkCode(regInfo.code)) {
      return callback('请填写验证码！');
    }
    if (!checkPwd(regInfo.newPwd)) {
      return callback('只允许以大小写字母开头，可包含数字及(_.@)！');
    }

    plus.nativeUI.showWaiting('waitng...');

    if (regInfo.id == 'forget') {
      mui.ajax(url + '/user/forgotpassword', {
        data: {
          code: regInfo.code,
          phone: regInfo.account,
          password: regInfo.newPwd
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function success(data) {
          plus.nativeUI.closeWaiting();

          if (data.status == 0) {
            account.value = '';
            code.value = '';
            newPwd.value = '';
            mui.currentWebview.close();
            return callback('密码修改成功！!!!');
          } else {
            return callback(data.message);
          }
        },
        error: function error(status) {
          plus.nativeUI.closeWaiting();
          return callback('密码修改失败！');
        }
      });
    } else if (regInfo.id == 'reset') {
      mui.ajax(url + '/user/resetpassword', {
        data: {
          api_token: regInfo.token,
          code: regInfo.code,
          phone: regInfo.account,
          password: regInfo.newPwd
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function success(data) {
          plus.nativeUI.closeWaiting();

          if (data.status == 0) {
            account.value = '';
            code.value = '';
            newPwd.value = '';
            app.setState({});
            plus.webview.getLaunchWebview().show('pop-in');
            return callback('密码修改成功！!!!');
          } else {
            return callback(data.message);
          }
        },
        error: function error(status) {
          plus.nativeUI.closeWaiting();
          return callback('密码修改失败！');
        }
      });
    }
  };

  /**
  * 获取应用本地配置
  **/
  owner.setSettings = function (settings) {
    settings = settings || {};
    localStorage.setItem('$settings', JSON.stringify(settings));
  };

  /**
  * 设置应用本地配置
  **/
  owner.getSettings = function () {
    var settingsText = localStorage.getItem('$settings') || '{}';
    return JSON.parse(settingsText);
  };
  /**
  * 获取本地是否安装客户端
  **/
  owner.isInstalled = function (id) {
    if (id === 'qihoo' && mui.os.plus) {
      return true;
    }
    if (mui.os.android) {
      var main = plus.android.runtimeMainActivity();
      var packageManager = main.getPackageManager();
      var PackageManager = plus.android.importClass(packageManager);
      var packageName = {
        'qq': 'com.tencent.mobileqq',
        'weixin': 'com.tencent.mm',
        'sinaweibo': 'com.sina.weibo'
      };
      try {
        return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
      } catch (e) {}
    } else {
      switch (id) {
        case 'qq':
          var TencentOAuth = plus.ios.import('TencentOAuth');
          return TencentOAuth.iphoneQQInstalled();
        case 'weixin':
          var WXApi = plus.ios.import('WXApi');
          return WXApi.isWXAppInstalled();
        case 'sinaweibo':
          var SinaAPI = plus.ios.import('WeiboSDK');
          return SinaAPI.isWeiboAppInstalled();
        default:
          break;
      }
    }
  };
})(mui, window.app = {});
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '8682' + '/');
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
},{}]},{},["node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","js\\app.js"], null)
//# sourceMappingURL=/app.a36c3c20.map