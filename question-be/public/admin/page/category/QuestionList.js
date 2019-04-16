layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //题目列表
    var tableIns = table.render({
        elem: '#newsList',
        url: '/admin/question/list?group_id=' + $("#group_id").val(),
        cellMinWidth: 95,
        page: false,
        height: "full-125",
        id: "group",
        cols: [[
            {field: 'id', title: 'ID', width: 100, align: "center"},
            {field: 'question', title: '问题', align: "center"},
            {field: 'sort', title: '排序', minWidth: 70, width: 70, align: "center"},
            {field: 'score', title: '分值比重', align: "center", width: 100},
            {field: 'created_at', title: '创建日期', align: "center", width: 170},
            {title: '操作', width: 170, templet: '#newsListBar', fixed: "right", align: "center"}
        ]]
    });


    $("#setredis").click(function () {
        $.get('/admin/setredis/group/' + $("#group_id").val(), function () {
            layer.msg("生成成功", {icon: 1, offset: '100px', time: '1000'});
        })
    })

    //添加题目
    function addQuestion() {
        var index = layui.layer.open({
            title: "添加题目",
            type: 2,
            content: "QuestionAdd.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                body.find("#group_id").val($("#group_id").val());
                setTimeout(function () {
                    layui.layer.tips('点击此处返回题目列表', '.layui-layer-setwin .layui-layer-close', {
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

    //题目编辑
    function QuestionEdit(edit) {
        var index = layui.layer.open({
            title: "题目编辑",
            type: 2,
            content: "QuestionEdit.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (edit) {
                    body.find("#group_id").val($("#group_id").val());
                    body.find("#question_id").val(edit.id);
                    body.find("#selects").val(edit.selects);
                    body.find("#answer").val(edit.answer);
                    body.find(".sort").val(edit.sort);
                    body.find(".question").val(edit.question);
                    body.find(".score").val(edit.score);
                    body.find(".difficulty").val(edit.difficulty);
                    form.render();
                }
                setTimeout(function () {
                    layui.layer.tips('点击此处返回题目列表', '.layui-layer-setwin .layui-layer-close', {
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


    $(".addQuestion_btn").click(function () {
        addQuestion();
    })


    //列表操作
    table.on('tool(newsList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            QuestionEdit(data);
        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除此题目？', {icon: 3, title: '提示信息'}, function (index) {
                $.ajax({
                    type: 'post',
                    url: '/admin/question/delete',
                    dataType: 'json',
                    data: {
                        group_id: $("#group_id").val(),
                        question_id: data.id
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