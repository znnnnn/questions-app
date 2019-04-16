layui.use(['form', 'layer', 'table', 'laytpl', 'laydate'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        table = layui.table;
    var laydate = layui.laydate;

    //用户列表
    var tableIns = table.render({
        elem: '#list',
        url: '/admin/user/list',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limits: [10, 15, 20, 25],
        limit: 15,
        id: "ListTable",
        cols: [[
            {field: 'id', title: 'ID', minWidth: 50, width: 100, align: "center"},
            {field: 'phone', title: '手机号', minWidth: 100, align: "center"},
            {field: 'career_name', title: '行业', minWidth: 100, align: "center"},
            {field: 'points', title: '积分', minWidth: 100, width: 100, align: "center"},
            {field: 'created_at', title: '创建日期', align: 'center', minWidth: 150},
            {title: '操作', minWidth: 175, templet: '#listBar', fixed: "right", align: "center"}
        ]]
    });

    //日期时间选择器
    laydate.render({
        elem: '#mindate'
        , type: 'datetime'
    });
    //日期时间选择器
    laydate.render({
        elem: '#maxdate'
        , type: 'datetime'
    });

    $.get('/admin/career/list', function (data) {
        var len = data.data.length;
        for (i = 0; i < len; i++) {
            $("#career_id").append("<option value='" + data.data[i].id + "'>" + data.data[i].name + "</option>")
        }
        form.render();
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function () {
        if ($(".searchVal").val() != '') {
            table.reload("ListTable", {
                page: {
                    curr: 1
                },
                where: {
                    phone: $("#phone").val(),
                    mindate: $("#mindate").val(),
                    maxdate: $("#maxdate").val(),
                    career_id: $("#career_id").val(),
                }
            })
        } else {
            layer.msg("请输入搜索的内容");
        }
    });

    function add(edit) {
        var index = layui.layer.open({
            title: "添加用户",
            type: 2,
            content: "add.html",
            success: function (layero, index) {
                setTimeout(function () {
                    layui.layer.tips('点击此处返回', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        })
        layui.layer.full(index);
        window.sessionStorage.setItem("index", index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(window.sessionStorage.getItem("index"));
        })
    }

    $(".add_btn").click(function () {
        add();
    })

    function update(edit) {
        var index = layui.layer.open({
            title: "修改用户",
            type: 2,
            content: "edit.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (edit) {
                    body.find("#id").val(edit.id);
                    body.find(".phone").val(edit.phone);
                    form.render();
                }
                setTimeout(function () {
                    layui.layer.tips('点击此处返回', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        })
        layui.layer.full(index);
        window.sessionStorage.setItem("index", index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(window.sessionStorage.getItem("index"));
        })
    }


    //列表操作
    table.on('tool(list)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            update(data);
        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除？', {icon: 3, title: '提示信息'}, function (index) {
                $.ajax({
                    type: 'post',
                    url: '/admin/user/delete',
                    dataType: 'json',
                    data: {
                        id: data.id,
                    },
                    success: function (data) {
                        if (data.status == 0) {
                            tableIns.reload();
                        } else {
                            layer.msg(data.message, {icon: 5, time: '1000'});
                        }
                        layer.close(index);
                    }
                })
            });
        }
    });

})
