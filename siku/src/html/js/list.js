$(() => {
    // 获得该id购物车的商品总数
    getcartcount(window.localStorage.id)
    function getcartcount(user_id) {
        $.ajax({
            type: "post",
            url: "../server/getcartcount.php",
            data: `user_id=${user_id}`,
            dataType: "json",
            success: function (response) {
                console.log(response);
                $(".gome-bar-btn-cart .bb").text(response.data.count)
            }
        });
    }
    new Promise(function (resolve, reject) {
        $.ajax({
            type: "get",
            url: "../server/getcount.php",
            dataType: "json",
            success: (data) => {
                let res = "";
                for (let i = 0; i < data.count; i++) {
                    res += `<a href="#top">${i + 1}</a>`
                }
                $("#page").html(res);
                $("#page").children().eq(0).addClass("active");
                resolve();
            }
        });
    }).then(function () {
        getDataWithPage(0, 1) //排序从0开始  页码从1开始
    })

    function getDataWithPage(type, page) {
        $.ajax({
            type: "post",
            url: "../server/listgetsj.php",
            data: `sortType=${type}&page=${page}`,
            dataType: "json",
            success: function (data) {
                renderUI(data);
                $(".show_tips").hover(function () {
                    $(this).toggleClass("bordertab");
                    $(this).children("span").toggleClass("cur");
                });
                $(".show_tips").click(function () { //跳转详情页
                    let name = $(this).children(".dl_name").text().trim();
                    let price = $(this).children(".dl_price").text().trim().slice(1);
                    let src = $(this).children("dt").children("img").attr("src");
                    let good_id = $(this).children("dt").attr("id");
                    var s = `name=${name},price=${price},src=${src},good_id=${good_id}`
                    window.location.href = "http://127.0.0.1/code/sikuproject/siku/src/html/content.html?" + s
                })
                $(".loveHeart").click(function (event) { //加入购物车
                    event.stopPropagation(); //阻止冒泡流
                    if (!window.localStorage.id) {
                        window.location.href = "http://127.0.0.1/code/sikuproject/siku/src/html/login.html";
                    } else {
                        let user_id = window.localStorage.id;
                        let good_id = $(this).parent().children("dt").attr("id");
                        let number = 1;
                        $.ajax({
                            type: "post",
                            url: "../server/addcart.php",
                            data: `user_id=${user_id}&good_id=${good_id}&number=${number}`,
                            dataType: "json",
                            success: function (response) {
                                getcartcount(user_id)
                            }
                        });

                        $(".love_tips").addClass("cur");
                        setTimeout(() => {
                            $(".love_tips").removeClass("cur");
                        }, 2000)
                        $(".winboxClose").click(() => {
                            $(".love_tips").removeClass("cur");
                        })
                    }

                })
            }
        });
    }

    function renderUI(data) {
        let html = data.map((ele) => {
            return ` <dl  class="">
        <div class="show_tips">
            <dt id="${ele.id}" data="[{&quot;无&quot;:&quot;&quot;}]">
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
            <span class="loveHeart" id="love_heart_57251996"><i  class="iconfont icon-3"> 加入购物车</i>
            </span>
        </div>
    </dl>`
        }).join("")
        $(".commodity-list").html(html)
    }
    $.t = 1;
    $(".typeBtn").click(function () {
        $(this).addClass("tab").siblings().removeClass("tab")
        $.t = $(this).index();
        $("#page a").eq(0).addClass("active").siblings().removeClass("active");
        getDataWithPage($.t, 1);
    })

    $("#page").on("click", "a", function () {
        getDataWithPage($.t, $(this).text());
        $(this).addClass("active").siblings().removeClass("active");
    })

})