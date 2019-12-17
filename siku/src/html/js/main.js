$(() => {
    class Margermain {
        constructor(data) {
            this.data = data;
        }
        init() {
            this.renderUI()
        }
        renderUI() {
            let html2 = this.data.secoo.map((ele) => {
                return `<li class="zh">
                    <div class="bg-mask"></div>
                    <img class="lazyPic"
                        data-original="//pic13.secooimg.com/push/18/11/b80a21c2b985477885c4536cfecbb38b.jpg"
                        src=${ele}
                        style="display: inline;">
                 </li>`
            }).join("")
            let html1 = this.data.liimg.map((ele) => {
                return ` <li class="zh">
                <div class="bg-mask"></div>
                <img class="lazyPic"
                    data-original="//pic11.secooimg.com/push/18/11/f77de773a9a646a4a9e18ab28d6c710d.jpg"
                    src=${ele}
                    style="display: inline;">
            </li>`
            }).join("")
            let html = `
           <div class="fashion-wardrobe ncontainer">
               <div class="left-img">
                   <div class="bg-mask"></div>
                   <img class="lazyPic"
                       data-original="//pic14.secooimg.com/push/18/11/e3e8ba6182a54c92b56c53899b751116.jpg"
                       src=${this.data.leftimg}
                       style="display: inline;">
               </div>
               <div class="right-img">
                   <img class="lazyPic" src=${this.data.rightimg}
                       style="display: inline;">
               </div>
           </div>
           <div class="secoo-app ncontainer">
               <img class="zh lazyPic"
                   data-original="http://pic11.secooimg.com/push/2019/0722/cd2f846655a04cd1ad1341254a916431.jpg"
                   src=${this.data.appimg}
                   style="display: block;">
           </div>
           <ul class="plate-entry ncontainer clearfix">
             ${html1}
           </ul>
           <div class="world-of-secoo">
           <div class="ncontainer">
               <h3 class="title">
                   <img src="http://mpic.secooimg.com/images/2018/11/07/the-world-of-secoo-title.png">
               </h3>
               <ul class="clearfix">
                   ${html2}
               </ul>
           </div>`

            $(".main").html(html)
        }
    }
    $.ajax({
        type: "get",
        url: "../server/main.php",
        dataType: "json",
        success: function (response) {
            new Margermain(response).init()
        }
    });
})

// addmoueseven() {

// }