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
        url: '/admin/feedback/list',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limits: [10, 15, 20, 25, 1000],
        limit: 15,
        id: "ListTable",
        cols: [[
            {field: 'phone', title: '手机号', minWidth: 100, align: "center"},
            {field: 'content', title: '内容', minWidth: 100, align: "center"},
            {field: 'comms', title: '联系方式', minWidth: 100, align: "center"},
            {field: 'created_at', title: '日期', minWidth: 100, align: "center"},
            {title: '操作', minWidth: 175, width: 100, templet: '#listBar', fixed: "right", align: "center"}
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
            }
        })
    });

    function detail(data) {
        var index = layui.layer.open({
            title: "反馈详情",
            type: 2,
            content: "detail.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (data) {
                    body.find(".id").val(data.id);
                    body.find(".phone").val(data.phone);
                    body.find(".content").val(data.content);
                    body.find(".comms").val(data.comms);
                    body.find(".date").val(data.created_at);
                    if (data.img1){
                        body.find(".img").append("<a target='_blank' href='/"+data.img1+"'><img width='200px' src='/"+data.img1+"'></a>");
                    }
                    if (data.img2){
                        body.find(".img").append("<a target='_blank' href='/"+data.img2+"'><img width='200px' src='/"+data.img2+"'></a>");
                    }
                    if (data.img3){
                        body.find(".img").append("<a target='_blank' href='/"+data.img3+"'><img width='200px' src='/"+data.img3+"'></a>");
                    }
                    if (data.img4){
                        body.find(".img").append("<a target='_blank' href='/"+data.img4+"'><img width='200px' src='/"+data.img4+"'></a>");
                    }
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

        if (layEvent === 'detail') {
            detail(data);
        }
    });

})
