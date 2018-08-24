/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
  /**
	 * 用户登录
	 **/
  owner.login = function(loginInfo, callback) {
    if (loginInfo.token != null) {
      plus.nativeUI.showWaiting('加载中...')
      mui.ajax(url + '/user/info', {
        data: {
          api_token: loginInfo.token
        },
        dataType: 'json',
        type: 'get',
        timeout: 10000,
        success: function(data) {
          toMain()
        },
        error: function(xhr, type, errorThrown) {
          app.setState({})
          plus.nativeUI.closeWaiting()
          plus.nativeUI.toast('自动登录失败，请重新登录')
        }
      })
      //			toMain();
      return false
    }
    sw = !!pwdBox.classList.contains('mui-hidden')
    api = sw ? url + '/login/sms' : url + '/login'
    callback = callback || $.noop
    loginInfo = loginInfo || {}
    loginInfo.account = loginInfo.account || ''
    loginInfo.password = loginInfo.password || ''
    if (!checkPhone(loginInfo.account)) {
      return callback('手机号格式错误！')
    }

    plus.nativeUI.showWaiting('登录中...')
    var accountBox = document.getElementById('account')

    var passwordBox = document.getElementById('password')

    var codeBox = document.getElementById('code')

    if (!sw) { // 密码登录
      if (loginInfo.password.length < 6) {
        plus.nativeUI.closeWaiting()
        return callback('密码最短为 6 个字符')
      }
      mui.ajax(url + '/login', {
        data: {
          phone: loginInfo.account,
          password: loginInfo.password
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function(data) {
          plus.nativeUI.closeWaiting()

          if (data.status == 0) {
            app.createState(data.data.api_token, function() {
              toMain()
            })
            accountBox.value = ''
            passwordBox.value = ''
            return callback('登录成功！')
          } else {
            return callback(data.message)
          }
        },
        error: function(xhr, type, errorThrown) {
          plus.nativeUI.closeWaiting()
          return callback('密码登录失败')
        }
      })
    } else { // 验证码登录
      if (checkCode(loginInfo.code)) {
        plus.nativeUI.closeWaiting()
        return callback('请填写验证码！')
      }
      mui.ajax(url + '/login/sms', {
        data: {
          phone: loginInfo.account,
          code: loginInfo.code
        },
        dataType: 'json',
        type: 'post',
        timeout: 5000,
        success: function(data) {
          plus.nativeUI.closeWaiting()
          if (data.status == 0) {
            app.createState(data.data.api_token, function() {
              toMain()
            })
            accountBox.value = ''
            codeBox.value = ''
            return callback('登录成功！')
          } else {
            return callback(data.message)
          }
        },
        error: function(xhr, type, errorThrown) {
          plus.nativeUI.closeWaiting()
          return callback('短信登录失败')
        }
      })
    }

    //
    //		var token = JSON.parse(localStorage.getItem('$users') || '[]');
    //		users.push(regInfo);
    //		localStorage.setItem('$users', JSON.stringify(users));
  }

  owner.createState = function(token, callback) {
    var state = owner.getState()
    state.token = token
    owner.setState(state)
    return callback()
  }

  /**
	 * 新用户注册
	 **/
  owner.reg = function(regInfo, callback) {
    callback = callback || $.noop
    regInfo = regInfo || {}
    regInfo.account = regInfo.account || ''
    regInfo.password = regInfo.password || ''
    if (!checkPhone(regInfo.account)) {
      return callback('手机号格式有误！')
    }
    if (checkCode(regInfo.code)) {
      return callback('请填写验证码！')
    }
    if (!checkPwd(regInfo.pwd)) {
      return callback('只允许以大小写字母开头，可包含数字及(_.@)！')
    }
    plus.nativeUI.showWaiting('waitng...')

    mui.ajax(url + '/register', {
      data: {
        code: regInfo.code,
        phone: regInfo.account,
        password: regInfo.pwd
      },
      dataType: 'json',
      type: 'post',
      timeout: 10000,
      success: function(data) {
        plus.nativeUI.closeWaiting()

        if (data.status == 0) {
          //					plus.webview.getLaunchWebview().show("fade-in",200,function () {
          plus.webview.currentWebview().close('fade-out')
          //					});
          return callback('注册成功！')
        } else {
          return callback(data.message)
        }

        return callback(1)
      },
      error: function(xhr, type, errorThrown) {
        plus.nativeUI.closeWaiting()
        return callback('注册失败！')
      }
    })

    //		var users = JSON.parse(localStorage.getItem('$users') || '[]');
    //		users.push(regInfo);
    //		localStorage.setItem('$users', JSON.stringify(users));
    //		return callback('注册成功！');
  }

  /**
	 * 获取当前状态
	 **/
  owner.getState = function() {
    var stateText = localStorage.getItem('$state') || '{}'
    return JSON.parse(stateText)
  }

  /**
	 * 设置当前状态
	 **/
  owner.setState = function(state) {
    state = state || {}
    localStorage.setItem('$state', JSON.stringify(state))
    var settings = owner.getSettings()
    settings.gestures = ''
    owner.setSettings(settings)
  }

  /**
	 * 找回密码
	 **/
  owner.forgetPassword = function(regInfo, callback) {
    callback = callback || $.noop
    if (!checkPhone(regInfo.account)) {
      return callback('手机号格式有误！')
    }
    if (checkCode(regInfo.code)) {
      return callback('请填写验证码！')
    }
    if (!checkPwd(regInfo.newPwd)) {
      return callback('只允许以大小写字母开头，可包含数字及(_.@)！')
    }

    plus.nativeUI.showWaiting('waitng...')

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
        success: function(data) {
          plus.nativeUI.closeWaiting()

          if (data.status == 0) {
            account.value = ''
            code.value = ''
            newPwd.value = ''
            mui.currentWebview.close()
            return callback('密码修改成功！!!!')
          } else {
            return callback(data.message)
          }
        },
        error: function(status) {
          plus.nativeUI.closeWaiting()
          return callback('密码修改失败！')
        }
      })
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
        success: function(data) {
          plus.nativeUI.closeWaiting()

          if (data.status == 0) {
            account.value = ''
            code.value = ''
            newPwd.value = ''
            app.setState({})
            plus.webview.getLaunchWebview().show('pop-in')
            return callback('密码修改成功！!!!')
          } else {
            return callback(data.message)
          }
        },
        error: function(status) {
          plus.nativeUI.closeWaiting()
          return callback('密码修改失败！')
        }
      })
    }
  }

  /**
	 * 获取应用本地配置
	 **/
  owner.setSettings = function(settings) {
    settings = settings || {}
    localStorage.setItem('$settings', JSON.stringify(settings))
  }

  /**
	 * 设置应用本地配置
	 **/
  owner.getSettings = function() {
    var settingsText = localStorage.getItem('$settings') || '{}'
    return JSON.parse(settingsText)
  }
  /**
	 * 获取本地是否安装客户端
	 **/
  owner.isInstalled = function(id) {
    if (id === 'qihoo' && mui.os.plus) {
      return true
    }
    if (mui.os.android) {
      var main = plus.android.runtimeMainActivity()
      var packageManager = main.getPackageManager()
      var PackageManager = plus.android.importClass(packageManager)
      var packageName = {
        'qq': 'com.tencent.mobileqq',
        'weixin': 'com.tencent.mm',
        'sinaweibo': 'com.sina.weibo'
      }
      try {
        return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES)
      } catch (e) {}
    } else {
      switch (id) {
        case 'qq':
          var TencentOAuth = plus.ios.import('TencentOAuth')
          return TencentOAuth.iphoneQQInstalled()
        case 'weixin':
          var WXApi = plus.ios.import('WXApi')
          return WXApi.isWXAppInstalled()
        case 'sinaweibo':
          var SinaAPI = plus.ios.import('WeiboSDK')
          return SinaAPI.isWeiboAppInstalled()
        default:
          break
      }
    }
  }
}(mui, window.app = {}))
