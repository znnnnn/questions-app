<!DOCTYPE html>
<html class="loginHtml">
<head>
    <meta charset="utf-8">
    <title></title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no">
    <link rel="icon" href="logo.ico">
    <link rel="stylesheet" href="layui/css/layui.css" media="all"/>
    <link rel="stylesheet" href="css/public.css" media="all"/>
    <script type="text/javascript" src="layui/layui.js"></script>
</head>
 <body class="loginBody">
    <form class="layui-form" id="loginfrom">
        <div class="login_face"><img src="images/head.png" class="userAvatar"></div>
        <div class="layui-form-item input-item">
            <label for="userName">账号</label>
            <input type="text" placeholder="请输入账号" autocomplete="off" id="acc" class="layui-input"
                   lay-verify="required">
        </div>
        <div class="layui-form-item input-item">
            <label for="password">密码</label>
            <input type="password" placeholder="请输入密码" autocomplete="off" id="password" class="layui-input"
                   lay-verify="required">
        </div>
        <div class="layui-form-item input-item" id="imgCode">
            <label for="code">验证码</label>
            <input type="text" placeholder="请输入验证码" autocomplete="off" id="code" class="layui-input">
            <img id="codeimg" src="/admin/captcha" onclick="this.src='/admin/captcha?'+Math.random();">
        </div>
        <div class="layui-form-item">
            <button class="layui-btn layui-block" lay-filter="login" lay-submit>登录</button>
        </div>
    </form>

    <script type="text/javascript" src="js/page/login.js"></script>
    <script type="text/javascript" src="js/cache.js"></script>
    </body>
	
</html>