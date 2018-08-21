$(document).ready(function () {
    var login = () => {
        $.ajax({
            type: 'POST',
            url: 'https://master-wfs.agilsun.com/wfs/auth/token',
            data: {
                email: $('.idEmail').val(),
                password: $('.idPassword').val()
            },
            statusCode: {
                401: function () {
                    alert("Tài Khoản MK Không Đúng");
                }
            },
            success: (main) => {
                localStorage.setItem('token', main.token);
                window.location.href = "index.html";
            }
        })

    };
    console.log(localStorage.getItem('token'))
    //-----EnterLogin-----//
    $(document).keypress(function (e) {
        if (e.which == 13) {
            login();
        }
    });
    //-----ButtonLogin-----//
    $('.idLogin').click(function () {
        login();
    });
});