layui.use(['form', 'layer', 'layedit', 'laydate', 'upload'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;

    var ismany = 0;

    form.on("submit(add)", function (data) {
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


        // console.log($("#group_id").val());
        // console.log($(".sort").val());
        // console.log($(".question").val());
        // console.log(Selects);
        // console.log(Answers);
        // console.log($(".score").val());
        // console.log(ismany);
        // console.log($(".difficulty").val());

        $.ajax({
            type: 'post',
            url: '/admin/question/create',
            dataType: 'json',
            data: {
                group_id: $("#group_id").val(),
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

    var i = 5;
    $("#addQues").on('click', function () {
        document.querySelector('.selects').innerHTML += '<input type="text" class="layui-input" placeholder="选项' + i + '">';
        document.querySelector('.answer').innerHTML += '<input type="checkbox" lay-filter="filter" name="" lay-skin="primary" title="' + i + '" value="' + i + '">';
        i++;
        form.render();
    })

    var answers = [];
    var Answers = '';//处理后的答案
    form.on('checkbox(filter)', function(data){

        if(data.elem.checked){
            answers.push(data.value);
        }else{
            answers.splice($.inArray(data.value,answers),1);
        }
        Answers = answers.join('|');

        if(Answers.length>1){
            ismany = 1;//多选
        }else{
            ismany = 0;
        }
    });

    form.render();

})