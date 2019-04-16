layui.use(['form', 'layer', 'table', 'laytpl', 'laydate'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        table = layui.table;
    var laydate = layui.laydate;

    var tableIns = table.render({
        elem: '#list',
        url: '/admin/reportsta/list',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limits: [10, 15, 20, 25, 1000],
        limit: 15,
        id: "ListTable",
        cols: [[
            {field: 'phone', title: '手机号', minWidth: 100, align: "center"},
            {field: 'group_name', title: '关卡名称', minWidth: 100, align: "center"},
            {field: 'max_get_score', title: '最高分', minWidth: 100, align: "center"},
            {field: 'time', title: '答题次数', minWidth: 100, align: "center"},
            {
                field: 'is_pass', title: '是否及格', minWidth: 100, align: "center", templet: function (d) {
                    if (d.is_pass == '1') {
                        return '<span class="layui-bg-green"><b>是</b></span>';
                    } else {
                        return '<span class="layui-bg-gray"><b>否</b></span>';
                    }
                }
            },
            {field: 'created_at', title: '最早答题日期', minWidth: 100, align: "center"},
            {field: 'updated_at', title: '最近答题日期', minWidth: 100, align: "center"},
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

    $.get('/admin/cate/list', function (data) {
        var len = data.data.length;
        for (i = 0; i < len; i++) {
            $("#cate_id").append("<option value='" + data.data[i].id + "'>" + data.data[i].nick + "</option>")
        }
        form.render();
    });


    //搜索
    $(".search_btn").on("click", function () {
        table.reload("ListTable", {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: {
                phone: $("#phone").val(),
                mindate: $("#mindate").val(),
                maxdate: $("#maxdate").val(),
                cate_id: $("#cate_id").val(),
                minscore: $("#minscore").val(),
                maxscore: $("#maxscore").val(),
            }
        })
    });
})
