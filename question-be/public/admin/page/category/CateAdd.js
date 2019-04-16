layui.use(['form', 'layer', 'layedit', 'laydate', 'upload'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;


    //日期时间选择器
    laydate.render({
        elem: '#time1'
        , type: 'datetime'
    });
    //日期时间选择器
    laydate.render({
        elem: '#time2'
        , type: 'datetime'
    });

    $.get('/admin/cate/list', function (data) {
        var len = data.data.length;
        for (i = 0; i < len; i++) {
            $("#cate").append("<option value='" + data.data[i].id + "'>" + data.data[i].nick + "</option>")
        }
        form.render();
    });
    $.get('/admin/career/list', function (data) {
        var len = data.data.length;
        for (i = 0; i < len; i++) {
            $("#career").append("<input type='checkbox' lay-filter='careers' name='' lay-skin='primary' title='" + data.data[i].name + "' value='" + data.data[i].id + "'>");
        }
        form.render();
    });


    form.on("submit(add)", function (data) {
        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});

        $.ajax({
            type: 'post',
            url: '/admin/cate/create',
            dataType: 'json',
            data: {
                name: $(".name").val(),
                sort: $(".sort").val(),
                mark: $(".mark").val(),
                pid: $("#cate").val(),
                career_id: Careers_names,
                start_time:$("#time1").val(),
                expire_time:$("#time2").val(),
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



    var careers_names = [],
        Careers_names = '';

    form.on('checkbox(careers)', function (data) {

        if (data.elem.checked) {
            careers_names.push(data.value);
        } else {
            careers_names.splice($.inArray(data.value, careers_names), 1);
        }
        Careers_names = careers_names.join(',');
    });

    form.render();

})