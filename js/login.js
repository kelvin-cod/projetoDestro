var user = {};
let https = 'https://destrobackend.herokuapp.com';
let local = 'http://localhost:3000';

function Login() {
    $("#gif").show();
    let http = `${https}/user/login`;
    let user = {
        email: $("#email").val(),
        password: $("#password").val()
    };

    if ($("#email").val() == '') {
        toastr.error("O Campo Email está vazio!", {
            positionClass: "toast-top-right"
        });
        $("#email").focus();
        $("#gif").hide();
        return;
    }
    if ($("#password").val() == '') {
        toastr.error("O Campo Senha está vazio!", {
            positionClass: "toast-top-right"
        });
        $("#password").focus();
        $("#gif").hide();
        return;
    }

    $.ajax({
        url: http,
        type: 'POST',
        data: user
    }).done(function (response) { //
         $("#gif").hide();
         if (response) {
            sessionStorage.setItem("user", JSON.stringify(response));
            window.location.href = "index.html";
        }

    }).fail(err => {
        if (err.responseJSON.message == "Invalid Password!") {
            toastr.error("A Senha está Incorreta", {
                positionClass: "toast-top-right"
            });
            $("#gif").hide();
            return
        } else if (err.responseJSON.message == "User Not found.") {
            toastr.error("Usuário não Cadastrado", {
                positionClass: "toast-top-right"
            });
            $("#gif").hide();
            return
        } else {
            console.log(err.responseJSON.message)
        }
    })
}

$(function () {

    var remember = $.cookie('remember');
    if (remember == 'true') {
        $('#remember').prop('checked', true);
        var email = $.cookie('email');
        var password = $.cookie('password');
        // autofill the fields
        $('#email').val(email);
        $('#password').val(password);
    }

    $("#login").on("click", function () {
        if ($('#remember').is(':checked')) {

            var email = $('#email').val();
            var password = $('#password').val();

            // set cookies to expire in 14 days
            $.cookie('email', email, {
                expires: 14
            });
            $.cookie('password', password, {
                expires: 14
            });
            $.cookie('remember', true, {
                expires: 14
            });
        } else {
            // reset cookies
            $.cookie('email', null);
            $.cookie('password', null);
            $.cookie('remember', null);
        }
    });
})