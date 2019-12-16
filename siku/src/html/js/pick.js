$(() => {
    class MargerPick {
        constructor(data) {
            this.data = data;
        }
        init() {
            this.renderUI()
            this.addmoueseven()
            $.index=0;
            $.dwidth=$(".editor-pick-list").width();
        }
        renderUI() {
            let html1 = this.data.map((ele) => {
                return ` <li>
            <div class="product-img">
                <img class="lazyPic" src=${ele.src}>
            </div>
            <div class="product-details">
                <p class="product-name">${ele.name}</p>
                <p class="product-desc">${ele.desc}</p>
                <div class="line"></div>
                <p class="product-price">${ele.price}</p>
            </div>
        </li>`
            }).join("")
            let html = ` <h3 class="title"></h3>
        <div class="editor-pick-list">
            <ul class="product-list">
            ${html1}
            </ul>
        </div>
        <div class="bottom-dir">
            <a class="prev" href="javascript:;">
                <i class="iconfont">&lt;</i>
            </a>
            <a class="next" href="javascript:;">
                <i class="iconfont">&gt;</i>
            </a>`
            $(".editor-pick").append(html);
        }
        addmoueseven() {
            $(".product-list > li").hover(function () {
                $(this).addClass("cur").siblings().removeClass("cur");
                $(this).children(".product-details").children("p").addClass("tabcolor");
            },function(){
                $(this).removeClass("cur").siblings().removeClass("cur");
                $(".product-details p").removeClass("tabcolor")
            })
            // 上下切换
            $(".bottom-dir .prev").on("click", () => {
                $.index--;
                if ($.index == -1) $.index = 10;
                $(".product-list").css({"left":-(($.dwidth+10) * $.index)});
            });
            $(".bottom-dir .next").on("click", () =>{
                $.index++;
                if ($.index == 11) $.index = 0;
                $(".product-list").css({"left":-(($.dwidth+10) * $.index)});
            });
        }
    }
    new MargerPick(datapick).init()
})

// addmoueseven() {

// }