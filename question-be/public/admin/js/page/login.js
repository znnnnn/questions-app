layui.use(['form', 'layer', 'jquery'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer
    $ = layui.jquery;
    //登录按钮
    form.on("submit(login)", function (data) {
        var self = $(this);
        $.ajax({
            type: 'post',
            url: '/admin/login',
            data: {
                'account': $("#acc").val(),
                'password': $("#password").val(),
                'code': $("#code").val(),
            },
            dataType: 'json',
            success: function (data) {
                if (data.status == '0') {
                    self.text("登录中...").attr("disabled", "disabled").addClass("layui-disabled");
                    setTimeout(function () {
                        window.location.href = "/admin/index";
                    }, 1000);
                } else if (data.status == '1') {
                    layer.msg(data.message, {icon: 5, time: '1000'});
                    $("#codeimg").attr("src", "/admin/captcha?" + Math.random() + "");
                } else if (data.status == '2') {
                    layer.msg(data.message, {icon: 5, time: '1000'});
                    $("#codeimg").attr("src", "/admin/captcha?" + Math.random() + "");
                }
            }
        });

        return false;
    })

    //表单输入效果
    $(".loginBody .input-item").click(function (e) {
        e.stopPropagation();
        $(this).addClass("layui-input-focus").find(".layui-input").focus();
    })
    $(".loginBody .layui-form-item .layui-input").focus(function () {
        $(this).parent().addClass("layui-input-focus");
    })
    $(".loginBody .layui-form-item .layui-input").blur(function () {
        $(this).parent().removeClass("layui-input-focus");
        if ($(this).val() != '') {
            $(this).parent().addClass("layui-input-active");
        } else {
            $(this).parent().removeClass("layui-input-active");
        }
    })
})
