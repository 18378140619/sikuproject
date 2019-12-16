$(() => {
    class Margerbanner {
        constructor(data) {
            this.data = data;
        }
        init() {
            this.renderUI(),
            this.addclickplay()
        }
        renderUI() {
            let html=`<div class="secoo-trend zh">
            <div class="top-img">
                <img src=${this.data.topimg}>
                <div class="bg-mask"></div>
            </div>
            <div class="bottom-img">
                <img src=${this.data.bottomimg}>
            </div>
            </a>
        </div>
        <div class="international-brands zh">
            <div class="left-img">
                <img src=${this.data.leftimg}>
            </div>
            <div class="right-img">
                <div class="bg-mask"></div>
                <img src=${this.data.rightimg}>
            </div>
            </a>
        </div>
        <div class="banner-video">
             <div class="bg-poster">
                <div class="bg-mask"></div>
                <div class="video-play"></div> 
                <img src=${this.data.videoimg}>
            </div>  
            <video class="video1" controls  src=${this.data.videosrc}></video>
        </div>`  
        $(".banner").html(html)
        }
        addclickplay(){
            $(".video-play").click(function(){
                // $(this).css("opacity","0")
                $(".bg-poster").remove();
                $(".video1").get(0).play();
            })
        }
    }
    new Margerbanner(databanner).init()
})

// addmoueseven() {

// }