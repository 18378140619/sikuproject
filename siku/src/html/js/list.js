$(() => {
    // $.ajax({
    //     type: "post",
    //     url: "../server/listgetsj.php",
    //     // data: "data",
    //     dataType: "json",
    //     success: function (data) {
    //         renderUI(data)
    //     }
    // });
    $.ajax({
        type: "get",
        url: "../server/getcount.php",
        dataType: "json",
        success: (data) => {
            let res = "";
            for (let i = 0; i < data.count; i++) {
                res += `<a href="javascript:;">${i + 1}</a>`
            }
            $("#page").html(res);
            $("#page").children().eq(0).addClass("active");
        }
    });

    getDataWithPage(0,1)
    function getDataWithPage(type,page) {
        $.ajax({
            type: "post",
            url: "../server/listgetsj.php",
            data: `sortType=${type}&page=${page}`,
            dataType: "json",
            success: function (data) {
                renderUI(data);
                $(".show_tips").hover(function () {
                        $(this).toggleClass("bordertab")
                        $(this).children("span").toggleClass("cur")
                    }
                );
            }
        });
    }

    function renderUI(data) {
        let html = data.map((ele) => {
            return ` <dl  class="">
        <div class="show_tips">
            <dt id="propic_57251996" data="[{&quot;无&quot;:&quot;&quot;}]">
                <img src=${ele.src} width="240" height="240" style="display: inline;">
            </dt>
            <dd class="dl_tips">
                <span class="s1">香港</span>
                <span class="s1">自营</span>
            </dd>
            <dd class="dl_name">
                <a href="" id="name_57251996" >${ele.name}</a>
            </dd>
            <dd class="dl_price clearfix">
                <span id="secoo_price_57251996"><i>￥</i>${ele.price}</span>
            </dd>
            <span class="loveHeart" id="love_heart_57251996"><i>收藏</i>
            </span>
        </div>
    </dl>`
        }).join("")
        $(".commodity-list").html(html)
    }
    $.t=1;
    $(".typeBtn").click(function () { 
        $(this).addClass("tab").siblings().removeClass("tab")
        let type=$(this).index();
        $.t=type;
        console.log($.t,type);
        getDataWithPage(type,1)
    })

    $("#page").on("click", "a", function() {
        console.log($.t,$(this).text());
        getDataWithPage($.t,$(this).text());
        $(this).addClass("active").siblings().removeClass("active");
    })
})