layui.use(['form', 'layer', 'layedit', 'laydate', 'upload'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;


    var answers = [];
    var Answers = '';//处理后的答案
    var ismany = 0;

    $.get('/admin/head', function () {
        var select_arr = ($('#selects').val()).split('|');
        var answer_arr = ($('#answer').val()).split('|');
        if (answer_arr.length > 1) ismany = 1;
        answers = answer_arr;
        Answers = $('#answer').val();
        console.log(select_arr);
        console.log(answer_arr);
        var sl = select_arr.length;
        for (j = 1; j <= sl; j++) {
            $(".selects").append("<input type='text' class='layui-input' placeholder='选项" + j + "' value='" + select_arr[j - 1] + "'>");
            // console.log(answer_arr.indexOf(j));
            // console.log(j);
            if (answer_arr.indexOf(j.toString()) > -1) {
                $(".answer").append("<input type='checkbox' lay-filter='filter' name='' lay-skin='primary' title='" + j + "' value='" + j + "' checked>");
            } else {
                $(".answer").append("<input type='checkbox' lay-filter='filter' name='' lay-skin='primary' title='" + j + "' value='" + j + "'>");
            }
        }
        form.render();

    })


    form.on("submit(edit)", function (data) {
        if ($(".question").val() == '') {
            layer.open({
                content: '题目不能为空'
            });
            return false;
        }

        var Selects = [];
        $('.selects input').each(function () {
            if (this.value != '') {
                Selects.push(this.value);
            }
        })
        Selects = Selects.join('|');
        if (Selects == '') {
            layer.open({
                content: '选项不能为空'
            });
            return false;
        }
        if (Answers == '') {
            layer.open({
                content: '答案不能为空'
            });
            return false;
        }
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});

        var Selects = [];
        $('.selects input').each(function () {
            if (this.value != '') {
                Selects.push(this.value);
            }
        })
        Selects = Selects.join('|');

        // console.log($("#group_id").val());
        // console.log($("#question_id").val());
        // console.log($(".sort").val());
        // console.log($(".question").val());
        // console.log(Selects);
        // console.log(Answers);
        // console.log($(".score").val());
        // console.log(ismany);
        // console.log($(".difficulty").val());

        $.ajax({
            type: 'post',
            url: '/admin/question/update',
            dataType: 'json',
            data: {
                group_id: $("#group_id").val(),
                question_id: $("#question_id").val(),
                sort: $(".sort").val(),
                question: $(".question").val(),
                selects: Selects,
                answer: Answers,
                score: $(".score").val(),
                ismany: ismany,
                difficulty: $(".difficulty").val()

            },
            success: function (data) {
                if (data.status == 0) {
                    setTimeout(function () {
                        top.layer.close(index);
                        top.layer.msg("修改成功！");
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

    var j = 5;
    $("#addQues").on('click', function () {
        document.querySelector('.selects').innerHTML += '<input type="text" class="layui-input" placeholder="选项' + j + '">';
        document.querySelector('.answer').innerHTML += '<input type="checkbox" lay-filter="filter" name="" lay-skin="primary" title="' + j + '" value="' + j + '">';
        j++;
        form.render();
    })

    form.on('checkbox(filter)', function (data) {

        if (data.elem.checked) {
            answers.push(data.value);
        } else {
            answers.splice($.inArray(data.value, answers), 1);
        }
        Answers = answers.join('|');

        if (Answers.length > 1) {
            ismany = 1;//多选
        } else {
            ismany = 0;
        }
    });

    form.render();

})