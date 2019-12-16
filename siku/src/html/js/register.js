$(() => {
    $("#umeInput").val(18378140619)
    $("#passwordInput").val(123456)
    $("#passwordagain").val(123456)
    $("#umeInput").blur(function () {
        let reg = /^1[3-9]\d{9}$/;
        let reg1 = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test($.trim($(this).val()))) {
            $(this).parents(".login_tips").prev().children(".regName_tips").text("");
            $(this).parents(".login_tips").removeClass("form-group-error");
        } else if (reg1.test($.trim($(this).val()))) {
            $(this).parents(".login_tips").removeClass("form-group-error");
            $(this).parents(".login_tips").prev().children(".regName_tips").text("");
        } else {
            $(this).parents(".login_tips").addClass("form-group-error");
            $(this).parents(".login_tips").prev().children(".regName_tips").css("color","red")
            $(this).parents(".login_tips").prev().children(".regName_tips").text("请输入正确的手机号或邮箱！")
        }
    })

    let captcha1 = new Captcha({
        dotNum: 10,
        lineNum: 20,
        fontSize: 40,
        length: 5,
    });
    let code;
    captcha1.draw(document.querySelector('#captcha'), r => {
        console.log(r, '验证码1');
        $("#kaptcha").val(r)
        code = r.toUpperCase();
    });
    $("#kaptcha").blur(function() {
        if ($.trim($(this).val()).toUpperCase() != code) {
            $(this).addClass("form-group-error");
            $(this).prev().children(".regName_tips").addClass("cur")
            $(this).prev().children(".regName_tips").css("color","red")
            $(this).prev().children(".regName_tips").text("请输入正确的图形验证码！")
        } else {
            $(this).removeClass("form-group-error");
            $(this).prev().children(".regName_tips").text("");
        }
    })

    $("#passwordInput").blur(function () {
        let reg = /^[0-9a-zA-Z]{3,6}$/;
        if (!reg.test($.trim($(this).val()))) {
            $(this).parents(".login_tips").addClass("form-group-error");
            $(this).parents(".login_tips").prev().children(".regName_tips").addClass("cur")
            $(this).parents(".login_tips").prev().children(".regName_tips").text("设置的密码不符合规范！");
        } else {
            $(this).parents(".login_tips").removeClass("form-group-error");
            $(this).parents(".login_tips").prev().children(".regName_tips").text("");
        }
    })

    $("#passwordagain").blur(function () {
        if ($.trim($(this).val()) != $.trim($("#passwordInput").val())) {
            $(this).parents(".login_tips").prev().children(".regName_tips").addClass("cur")
            $(this).parents(".login_tips").addClass("form-group-error");
            $(this).parents(".login_tips").prev().children(".regName_tips").text("两次输入的密码不一致！！！");
        } else {
            $(this).parents(".login_tips").removeClass("form-group-error");
            $(this).parents(".login_tips").prev().children(".regName_tips").text("");
        }
    })
     
    $("#regSubmit").click(function() {
        $("#kaptcha,#umeInput,#passwordInput,#passwordagain").trigger("blur");
        if ($(".form-group-error").length != 0) {
            alert("请输入正确的注册信息");
        };

        if ($("#readProtocol").is(":checked") == false) {
            alert("请阅读并同意用户协议！！！");
        };
        if ($(".form-group-error").length == 0 && $("#readProtocol").is(":checked") != false){
        $.ajax({
            type: "post",
            url: "../server/register.php",
            data: `username=${$("#umeInput").val()}&password=${$("#passwordInput").val()}`,
            dataType: "json",
            success: function (data) {
                if (data.status == "success") {
                    window.location.href = "http://www.secoo.com/";
                } else {
                    alert(data.data.msg)
                }
            }
        })}
    })
})