var novaURL = "../pages/login.html";

 async function isloggedIn() {
   
    let user = {};
    user = await sessionStorage.getItem("user");
    console.log(JSON.parse(user))


    if (user == null) {
        $(window.document.location).attr('href', novaURL);
    } else {
      //  $(window.document.location).attr('href', "index.html");
    }
 
};

window.onload = isloggedIn();