layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //添加验证规则
    form.verify({
        newPwd: function (value, item) {
            if (value.length < 6) {
                return "密码长度不能小于6位";
            }
        },
        confirmPwd: function (value, item) {
            if (!new RegExp($("#newPwd").val()).test(value)) {
                return "两次输入密码不一致，请重新输入！";
            }
        }
    })

    form.on("submit(changePwd)", function (data) {
        layer.confirm('确定修改密码？', {icon: 3, title: '提示信息'}, function (index) {
            $.ajax({
                type: 'post',
                url: '/admin/password/reset',
                data: {'oldpwd': $("#oldPwd").val(), 'newpwd': $("#newPwd").val()},
                dataType: 'json',
                success: function (data) {
                    if (data.status == 0) {
                        layer.msg('修改成功!', {icon: 1, time: '1000'}, function () {
                            window.location.reload();
                        });
                    } else {
                        layer.msg(data.message, {icon: 5, time: '1000'});
                    }
                }
            });
        });
        return false;
    });

})