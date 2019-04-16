layui.use(['form', 'layer'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;

    form.on("submit(add)", function (data) {
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});

        $.ajax({
            type: 'post',
            url: '/admin/user/create',
            dataType: 'json',
            data: {
                phone: $(".phone").val(),
                password: $(".password").val(),
            },
            success: function (data) {
                if (data.status == 0) {
                    setTimeout(function () {
                        top.layer.close(index);
                        top.layer.msg("添加成功！");
                        layer.closeAll("iframe");
                        //刷新父页面
                        parent.location.reload();
                    }, 0);
                } else {
                    layer.msg(data.message, {icon: 5, time: '1000'});
                }
            }
        });
        return false;
    })

})