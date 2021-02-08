var novaURL = "/login.html";
var user;
async function isloggedIn() {

  try {
    user = await JSON.parse(sessionStorage.getItem("user")); //JSON.parse(sessionStorage.getItem("user"));
    if (user.tipo == 1) {
      user.tipo = "Administrador"
    } else {
      user.tipo = "Básico"
    }
    $("#user").text(user.username);
     $("#userTipo").text(user.tipo);
  } catch (error) {
    console.log(error)
  }

  if (user == null) {

  //  $(window.document.location).attr('href', novaURL);
    //$(window.document.location).attr('href', "../index.html");
    //window.location.href = "/index.html";
  } else {

  }


};


window.onload = isloggedIn();

setTimeout(function () {
  // isloggedIn();
}, 500);

$("#logout").on("click", () => {

  sessionStorage.removeItem('user')
  // $(window.document.location).attr('href', "login.html")
  window.location.href = "../pages/login.html";
});


(function ($) {
  // USE STRICT
  "use strict";
  $(".animsition").animsition({
    inClass: 'fade-in',
    outClass: 'fade-out',
    inDuration: 900,
    outDuration: 900,
    linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([class^="chosen-single"])',
    loading: true,
    loadingParentElement: 'html',
    loadingClass: 'page-loader',
    loadingInner: '<div class="page-loader__spin"></div>',
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: ['animation-duration', '-webkit-animation-duration'],
    overlay: false,
    overlayClass: 'animsition-overlay-slide',
    overlayParentElement: 'html',
    transition: function (url) {
      window.location.href = url;
    }
  });


})(jQuery);