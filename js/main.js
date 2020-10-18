var novaURL = "../pages/login.html";

async function isloggedIn2() {

  let user;

  try {
    user = await sessionStorage.getItem("user") //JSON.parse(sessionStorage.getItem("user"));
  } catch (error) {
    console.log(error)
  }


};

function name() {
  user = sessionStorage.getItem("user")
  if (user == 1) {
    console.log(user)
    //$(window.document.location).attr('href', "../index.html");
    window.location.href = "../index.html";
  } else {

    $(window.document.location).attr('href', novaURL);
  }

}
window.onload = name();
window.onload = console.log('alo')

setTimeout(function () {
  // isloggedIn();
}, 500);

$("#logout").on("click", () => {

  sessionStorage.removeItem('user')
  $(window.document.location).attr('href', "../pages/login.html")
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