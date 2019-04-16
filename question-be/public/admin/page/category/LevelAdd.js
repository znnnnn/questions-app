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

    $.get('/admin/career/list', function (data) {
        var len = data.data.length;
        for (i = 0; i < len; i++) {
            $("#career").append("<input type='checkbox' lay-filter='careers' name='' lay-skin='primary' title='" + data.data[i].name + "' value='" + data.data[i].id + "'>");
        }
        form.render();
    });


    $.get('/admin/head', function () {
        $.get('/admin/group/list', {cate_id: $("#cate_id").val()}, function (data) {
            var len = data.data.length;
            for (i = 0; i < len; i++) {
                $("#pre_group_id").append("<option value='" + data.data[i].id + "'>" + data.data[i].name + "</option>")
            }
            form.render();
        })
    })


    form.on("submit(add)", function (data) {

        // console.log($("#cate_id").val());
        // console.log($(".name").val());
        // console.log($(".sort").val());
        // console.log($(".mark").val());
        // console.log($(".pass").val());
        // console.log($(".difficulty").val());
        // console.log($("#pre_group_id").val());
        // console.log(Careers_names);
        // console.log($("#time1").val());
        // console.log($("#time2").val());

        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});

        $.ajax({
            type: 'post',
            url: '/admin/group/create',
            dataType: 'json',
            data: {
                cate_id: $("#cate_id").val(),
                name: $(".name").val(),
                sort: $(".sort").val(),
                mark: $(".mark").val(),
                pass: $(".pass").val(),
                difficulty: $(".difficulty").val(),
                pre_group_id: $("#pre_group_id").val(),
                career_id: Careers_names,
                start_time: $("#time1").val(),
                expire_time: $("#time2").val(),
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

    var difficulty = $('.difficulty').val();
    form.on('select(difficulty)', function (data) {
        difficulty = data.value;
        form.render('select');
    });


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