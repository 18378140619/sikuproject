$(() => {
    /* 实现切换的功能 */
    // $(".tab-login-item").click(function() {
    //     /* 设置当前标签选中，并且排它处理 */
    //     $(this).addClass("active").siblings().removeClass("active");
    //     $(".loginView").eq($(this).index()).addClass("loginViewCurrent").siblings().removeClass("loginViewCurrent");
    // })
     $("#userName").val("18378140619");
     $("#userPass").val("123456");
    /* 登录按钮的点击事件 */
    $("#loginButton").click(function() {
        let usernameVal = $("#userName").val();
        let passwordVal = $("#userPass").val();
        $.ajax({
            type: "post",
            url: "../server/login.php",
            data: `username=${usernameVal}&password=${passwordVal}`,
            dataType: "json",
            success: function(response) {
                /* 登录成功 */
                if (response.status == "success") {
                    /* 跳转到首页 */
                    window.location.href = "http://www.secoo.com/";
                } else {
                    /* 注册失败： */
                    alert(response.msg);
                }

                /* 登录失败 */
            }
        });

    })
})