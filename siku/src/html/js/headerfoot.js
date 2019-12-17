$(() => {
    class MargerA {
        constructor(data) {
            this.data = data;
            this.addmoueseven()
        }
        init() {
            this.renderUI()
        }
        renderUI() {
            let html = this.data.map((ele, index) => {
                let html1 = ele.fenlei.map((itm, index) => {
                    return `<a href="">${itm}</a>`
                }).join("")
                let html2 = ele.pinpai.map((itm) => {
                    return `<a href="">${itm}</a>`
                }).join("")
                return `  <li class="nav-item">
                     <a}">${ele.title}</a>
                   <div class="nav-unfold">
                    <ul class="unfold-list ncontainer clearfix">
                        <li>
                            <h4 class="zh">分类</h4>
                            ${html1}
                        </li>
                        <li>
                            <h4 class="zh">品牌</h4>
                            ${html2}
                        </li>
                    </ul>
                </div>
            </li>`
            }).join("")
            $(".nav-menu").append(html)
        }
        addmoueseven() {
            $(".public-media span").hover(function () {
                $(this).next().toggleClass("cur")
            })
            $(".our-app a").hover(function () {
                $(this).next().toggleClass("cur")
            })
            $(".search-inner").click(() => {
                $(".search-inner").addClass("clickinput");
                $(".search-inner .search-input").attr("value", "")
                $(".icon-sousuo").css("color", "#fff")
            })
            $(".search-input").blur(() => {
                $(".search-inner").removeClass("clickinput");
                $(".search-inner .search-input").attr("value", "搜索")
                $(".icon-sousuo").css("color", "yellow")
            })
            $(".nav-menu").on("click", ".nav-item", function () {
                console.log($(this).index());
                if ($(this).index() == 0) {
                    window.location.href = "http://127.0.0.1/code/sikuproject/siku/src/public/shouye.html";
                } else if ($(this).index() == 1) {
                    window.location.href = "http://127.0.0.1/code/sikuproject/siku/src/html/list.html";
                }
            })
        }
    }
    $.ajax({
        type: "get",
        url: "../server/nav.php",
        dataType: "json",
        success: function (response) {
            new MargerA(response).init()
        }
    });
})