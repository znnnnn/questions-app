layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //关卡列表
    var tableIns = table.render({
        elem: '#newsList',
        url: '/admin/group/list?cate_id=' + $("#cate_id").val(),
        cellMinWidth: 95,
        page: false,
        height: "full-125",
        id: "group",
        cols: [[
            {field: 'id', width: 100, title: 'ID', align: "center"},
            {field: 'name', title: '名称', align: "center"},
            {field: 'sort', minWidth: 60, width: 60, title: '排序', align: "center"},
            {field: 'difficulty', minWidth: 60, width: 60, title: '难度', align: "center"},
            {field: 'pre_group_name', title: '需要通关的关卡', align: "center"},
            {field: 'pass', title: '及格百分比', align: "center"},
            {field: 'careers_name', title: '行业', align: "center"},
            {field: 'mark', title: '备注', align: "center", width: 200},
            {field: 'created_at', title: '创建日期', align: "center", minWidth: 210},
            {title: '操作', width: 200, templet: '#newsListBar', fixed: "right", align: "center"}
        ]]
    });


    //添加关卡
    function addLevel() {
        var index = layui.layer.open({
            title: "添加关卡",
            type: 2,
            content: "LevelAdd.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                body.find("#cate_id").val($("#cate_id").val());
                form.render();
                setTimeout(function () {
                    layui.layer.tips('点击此处返回关卡列表', '.layui-layer-setwin .layui-layer-close', {
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

    //关卡编辑
    function LevelEdit(edit) {
        var index = layui.layer.open({
            title: "关卡编辑",
            type: 2,
            content: "LevelEdit.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (edit) {
                    body.find("#cate_id").val($("#cate_id").val());
                    body.find("#group_id").val(edit.id);
                    body.find("#career_id").val(edit.career_id);
                    body.find(".name").val(edit.name);
                    body.find(".sort").val(edit.sort);
                    body.find(".difficulty").val(edit.difficulty);
                    body.find(".pre_group_id").val(edit.pre_group_id);
                    body.find(".pass").val(edit.pass);
                    body.find(".mark").val(edit.mark);
                    body.find(".start_time").val(edit.start_time);
                    body.find(".expire_time").val(edit.expire_time);
                    form.render();
                }
                setTimeout(function () {
                    layui.layer.tips('点击此处返回关卡列表', '.layui-layer-setwin .layui-layer-close', {
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

    //题目列表
    function QuestionList(data) {
        var index = layui.layer.open({
            title: "题目列表 - "+data.name,
            type: 2,
            content: "Questionlist.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (data) {
                    body.find("#group_id").val(data.id);
                    body.find("#group_id").val(data.id);
                    body.find("#group_id").val(data.id);
                    // form.render();
                }
                setTimeout(function () {
                    layui.layer.tips('点击此处返回关卡列表', '.layui-layer-setwin .layui-layer-close', {
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

    $(".addLevel_btn").click(function () {
        addLevel();
    })


    $("#setredis").click(function () {
        $.get('/admin/setredis/cate/' + $("#cate_id").val(), function () {
            layer.msg("生成成功", {icon: 1, offset: '100px', time: '1000'});
        })
    })

    //列表操作
    table.on('tool(newsList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            LevelEdit(data);
        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除？', {icon: 3, title: '提示信息'}, function (index) {
                $.ajax({
                    type: 'post',
                    url: '/admin/group/delete',
                    dataType: 'json',
                    data: {
                        cate_id: $("#cate_id").val(),
                        group_id: data.id
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
        } else if (layEvent === 'question') { //加载题目
            QuestionList(data);
        }
    });

})