layui.use(['form', 'layer', 'table', 'laytpl'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        table = layui.table;

    //用户列表
    var tableIns = table.render({
        elem: '#list',
        url: '/admin/config/list',
        cellMinWidth: 95,
        page: false,
        height: "full-125",
        id: "ListTable",
        cols: [[
            {field: 'name', title: '名称', minWidth: 100, width: 200, align: "center"},
            {field: 'title', title: '标题', minWidth: 100, width: 250, align: "center"},
            {field: 'mark', title: '备注', minWidth: 100, width: 250, align: "center"},
            {field: 'content', title: '值（点击表格修改）', minWidth: 150, align: "center", edit: 'text'},
            {title: '操作', minWidth: 100, width: 100, templet: '#listBar', fixed: "right", align: "center"}
        ]]
    });

    //列表操作
    table.on('tool(list)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            layer.confirm('确定保存？', {icon: 3, title: '提示信息'}, function (index) {
                $.ajax({
                    type: 'post',
                    url: '/admin/config/update',
                    dataType: 'json',
                    data: {
                        id: data.id,
                        content: data.content,
                    },
                    success: function (data) {
                        if (data.status == 0) {
                            layer.msg("保存成功！", {icon: 1, time: '1000'});
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
