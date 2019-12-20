$(() => {
    let user_id = window.localStorage.id;
    getdata(user_id)//拿该用户数据库所有的数据
    function getdata(user_id, type=0, good_id = 0,n=0) {
        $.ajax({
            type: "post",
            url: "../server/getcartsj.php",
            data: `user_id=${user_id}&type=${type}&good_id=${good_id}&n=${n}`,
            dataType: "json",
            success: function (data) {
                runderUI(data)
                addmouceeven()
            }
        });
    }
    function runderUI(data) {
        let html = data.map((ele) => {
            return ` <div class="cart-item">
           <div class="p-checkbox">
               <input type="checkbox" name="" id="" class="j-checkbox">
           </div>
           <div id="${ele["good_id"]}" class="p-goods">
               <div class="p-img">
                   <img src=${ele.src} alt="">
               </div>
               <p class="p-msg">${ele.name}</p>
           </div>
           <div class="p-price">￥${ele.price}</div>
           <div class="p-num">
               <div class="quantity-form">
                   <a href="javascript:;" class="decrement">-</a>
                   <input type="text" class="itxt" value="${ele.number}">
                   <a href="javascript:;" class="increment">+</a>
               </div>
           </div>
           <div class="p-sum">￥${ele.price*ele.number}</div>
           <div class="p-action"><a href="javascript:;">删除</a></div>
       </div>`
        }).join("")
        $(".cart-item-list").html(html)
    }

    function addmouceeven() {
        $(".checkall").change(function () {
            // 当全选按钮改变时，让小复选框按钮和全选按钮保持一致
            //当勾选时 $(this).prop("checked") true
            $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
            getSum(); // 计算总额函数
            // 添加背景
            // 判断是否是选中状态，是的话添加check-cart-item(作用添加背景颜色)类，没有就移除
            if ($(this).prop("checked")) {
                $(".cart-item").addClass("check-cart-item");
            } else {
                $(".cart-item").removeClass("check-cart-item");
            }
        })
        $(".j-checkbox").change(function () {
            // 判断勾选的个数和总个数比较  等于的话 就勾选全选框
            if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
                $(".checkall").prop("checked", true);
            } else {
                $(".checkall").prop("checked", false);
            }
            getSum();
            // 当小复选框为选中状态时，改变背景颜色（添加check-cart-item类）
            if ($(this).prop("checked")) {
                $(this).parents(".cart-item").addClass("check-cart-item");
            } else {
                $(this).parents(".cart-item").removeClass("check-cart-item");
            }
        })
        $(".quantity-form a").click(function(){
            let tt = "add";
            let good_id = $(this).parents(".cart-item").children(".p-goods").attr("id")
            var n = $(this).siblings(".itxt").val();
            if($(this).attr("class")=="decrement"){
                n <= 1 ? n : n--;
            }else if($(this).attr("class")=="increment"){
                n++; 
            }
            getdata(user_id, tt, good_id,n)
            getSum();
        })
        // 计算总额函数
        function getSum() {
            var count = 0;
            var money = 0;
            // 只遍历选中的商品   each遍历，i为索引，ele为对象
            $(".j-checkbox:checked").parents(".cart-item").find(".itxt").each(function (i, ele) {
                count += parseInt($(ele).val()); // 会有小误差，要取整一下
            })
            $(".amount-sum em").text(count);
            $(".j-checkbox:checked").parents(".cart-item").find(".p-sum").each(function (i, ele) {
                money += parseFloat($(ele).text().substr(1));
            })
            $(".price-sum em").text("￥" + money.toFixed(2));
        }
        // 删除商品模块
        // 删除单个商品
        $(".p-action a").click(function () {
            let type = "deleteone"
            let good_id = $(this).parents(".cart-item").children(".p-goods").attr("id")
            getdata(user_id,type,good_id)
            getSum();
        })
        // 删除选中的商品或者清空购物车
        $(".operation a").click(function(){
            let idarr = [],b=$(".j-checkbox"),type="remove-batch"
            if($(this).attr("class")=="remove-batch") b= $(".j-checkbox:checked");
            for (let index = 0; index < b.length; index++) {
                let i = b.eq(index).parents(".cart-item").children(".p-goods").attr("id");
                idarr.push(i)
            }
            getdata(user_id,type,idarr);
            getSum();         
        })
        // 判断购物车为空
        if($(".j-checkbox").length==0){
            $(".cart-empty").addClass("cur")
        }else{
            $(".cart-empty").removeClass("cur")
        }
    }
})