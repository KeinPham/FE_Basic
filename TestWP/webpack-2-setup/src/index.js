// Xử lý trạng thái Login
function statusChangeCallback(response) {
    if (response.status === 'connected') {
        alert('Login Facebook Success')
    } else {
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        window.location.reload();
    });
  }
function out(){
    FB.logout(function(response) {
        statusChangeCallback(response);
     });
}
window.fbAsyncInit = function () {
     FB.init({
      appId      : '474666213001663',
      xfbml      : true,
      version    : 'v3.1'
    });
    FB.AppEvents.logPageView();
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

// Xử lý trạng thái Login
function statusChangeCallback(response) {
    if (response.status === 'connected') {
        alert('Login Facebook Success')
    } else {
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    }
}

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));





