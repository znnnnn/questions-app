layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //顶级分类列表
    var tableIns = table.render({
        elem: '#newsList',
        url: '/admin/cate/list',
        cellMinWidth: 95,
        page: false,
        height: "full-125",
        id: "newsListTable",
        cols: [[
            {field: 'sort', align: 'center', width: 60, title: '排序'},
            {field: 'nick', title: '名称'},
            {field: 'mark', align: 'center', title: '备注'},
            {field: 'careers_name', title: '行业', width: 350},
            {
                field: 'start_time', title: '开始时间', align: 'center', minWidth: 110, templet: function (d) {
                    return d.start_time ? d.start_time : '';
                }
            },
            {
                field: 'expire_time', title: '结束时间', align: 'center', minWidth: 110, templet: function (d) {
                    return d.expire_time ? d.expire_time : '';
                }
            },
            {title: '操作', minWidth: 180, width: 200, templet: '#newsListBar', fixed: "right", align: "center"}
        ]]
    });


    //添加分类
    function addCate() {
        var index = layui.layer.open({
            title: "添加分类",
            type: 2,
            content: "CateAdd.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                setTimeout(function () {
                    layui.layer.tips('点击此处返回分类列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        })
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(index);
        })
    }

    //分类编辑
    function CateEdite(edit) {
        var index = layui.layer.open({
            title: "分类编辑",
            type: 2,
            content: "CateEdit.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (edit) {
                    body.find("#id").val(edit.id);
                    body.find(".name").val(edit.name);
                    body.find(".sort").val(edit.sort);
                    body.find(".mark").val(edit.mark);
                    body.find("#pid").val(edit.pid);
                    body.find("#career_id").val(edit.career_id);
                    body.find(".start_time").val(edit.start_time);
                    body.find(".expire_time").val(edit.expire_time);
                    form.render();
                }
                setTimeout(function () {
                    layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        })
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(index);
        })
    }

    //关卡列表
    function LevelList(data) {
        var index = layui.layer.open({
            title: "关卡列表 - " + data.name,
            type: 2,
            content: "Levellist.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (data) {
                    body.find("#cate_id").val(data.id);
                    body.find("#cate_id").val(data.id);
                    body.find("#cate_id").val(data.id);
                    // form.render();
                }
                setTimeout(function () {
                    layui.layer.tips('点击此处返回分类列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        })
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(index);
        })
    }

    $(".addCate_btn").click(function () {
        addCate();
    })

    $("#setredis").click(function () {
        $.get('/admin/setredis/all', function () {
            layer.msg("生成成功", {icon: 1, offset: '100px', time: '1000'});
        })
    })


    //列表操作
    table.on('tool(newsList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            CateEdite(data);
        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除？', {icon: 3, title: '提示信息'}, function (index) {
                $.ajax({
                    type: 'post',
                    url: '/admin/cate/delete',
                    dataType: 'json',
                    data: {
                        id: data.id
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
        } else if (layEvent === 'level') { //加载关卡
            LevelList(data);
        }
    });

})