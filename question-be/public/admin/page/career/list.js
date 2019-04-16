layui.use(['form', 'layer', 'table', 'laytpl'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        table = layui.table;

    //用户列表
    var tableIns = table.render({
        elem: '#list',
        url: '/admin/career/list',
        cellMinWidth: 95,
        page: false,
        height: "full-125",
        // limits : [10,15,20,25],
        // limit : 20,
        id: "ListTable",
        cols: [[
            // {type: "checkbox", fixed: "left", width: 50},
            {field: 'id', title: 'id', minWidth: 100, align: "center"},
            {field: 'name', title: '名称', minWidth: 100, align: "center"},
            {field: 'mark', title: '备注', minWidth: 100, align: "center"},
            {field: 'created_at', title: '创建日期', minWidth: 100, align: "center"},
            {title: '操作', minWidth: 175, templet: '#listBar', fixed: "right", align: "center"}
        ]]
    });

    function add(edit) {
        var index = layui.layer.open({
            title: "添加行业",
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

    function update(edit) {
        var index = layui.layer.open({
            title: "修改行业",
            type: 2,
            content: "edit.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (edit) {
                    body.find("#id").val(edit.id);
                    body.find(".name").val(edit.name);
                    body.find(".mark").val(edit.mark);
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

    $(".add_btn").click(function () {
        add();
    })

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
                    url: '/admin/career/delete',
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
