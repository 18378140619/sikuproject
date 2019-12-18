$(() => {
    let str = decodeURI(window.location.search.slice(1)); //decodeURI 转码 去问号
    function queryString(searchstr) {
        var o = {};
        var arr = searchstr.split(","); //["name=zs","age=10","className=H5"];
        arr.forEach(function (item) {
            var data = item.split("="); //["name","zs"];
            var key = data[0];
            var val = data[1];
            o[key] = val; //将 data[0]：data[1] 存进对象O
        })
        return o;
    }
    // console.log(queryString(str));
    let data = queryString(str);
    $("dt img").attr("src", data.src);
    $(".proName h2").text(data.name);
    $(".secooPriceJs").text(data.price);
    $(".move_box img").attr("src", data.src);

    //放大镜
    $("dt").hover(() => $(".zoomspan,.zoomdiv").toggleClass("cur"))
    $("dt").mousemove(function (e) {
        // 遮罩走动的距离
        let oMaskX = e.pageX - $("dt").offset().left - $(".zoomspan").width() / 2;
        let oMaskY = e.pageY - $("dt").offset().top - $(".zoomspan").height() / 2;
        // 遮罩移动的最大距离
        let maxX = $("dt").width() - $(".zoomspan").width();
        let maxY = $("dt").height() - $(".zoomspan").height();
        // 让遮罩不走出去,给他一个临界值判断
        oMaskX = oMaskX >= maxX ? maxX : oMaskX;
        oMaskX = oMaskX <= 0 ? 0 : oMaskX;
        oMaskY = oMaskY >= maxY ? maxY : oMaskY;
        oMaskY = oMaskY <= 0 ? 0 : oMaskY;
        //让遮罩跟随鼠标走动
        $(".zoomspan").css({
            "left": oMaskX,
            "top": oMaskY
        })
        // 当遮罩走多少，相应的大图片也要按一定的比例走多少，这个比例一定是一个定值
        let biliX = ($(".zoomdiv>img").width() - $("dt").width()) / maxX;
        let biliY = ($(".zoomdiv>img").height() - $("dt").height()) / maxY;
        // 大图片走动的距离,大图片向反的方向走
        $(".zoomdiv>img").css({
            "left": -oMaskX * biliX,
            "top": -oMaskY * biliY
        })
    })

    //点击加数量
    $("#subProduct").click(() => {
        let count = $("#buyNumVal").val();
        count--;
        if (count < 1) count = 1;
        $("#buyNumVal").val(count);
    })
    $("#addProduct").click(() => {
        let count = $("#buyNumVal").val();
        count++;
        $("#buyNumVal").val(count)
    })
    $(".addshop").click(() => {
        let msg = $(".proName h2").text().trim();
        let price = $("#secooPriceJs").text();
        let src = $(".jqzoom").attr("src");
        let number = $("#buyNumVal").val();
        $.ajax({
            type: "post",
            url: "../server/addcart.php",
            data: `src=${src}&msg=${msg}&price=${price}&number=${number}`,
            dataType: "json",
            success: function (response) {
                console.log(response);
            }
        });
        $(".love_tips").addClass("cur");
        setTimeout(()=>{
            $(".love_tips").removeClass("cur");
        },2000)
        $(".winboxClose").click(()=>{
            $(".love_tips").removeClass("cur");
        })
    })
})