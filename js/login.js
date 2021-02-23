var user = {};
let https = 'https://destrobackend.herokuapp.com';
let local = 'http://localhost:3000';

function Login() {
    $("#gif").show();
    let http = `${https}/user/login`;
    let user = {
        username: $("#username").val(),
        password: $("#password").val()
    };

    if ($("#username").val() == '') {
        toastr.error("O Campo Nome de Usuario está vazio!", {
            positionClass: "toast-top-right"
        });
        $("#username").focus();
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
            window.location.href = "../index.html";
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
        var username = $.cookie('username');
        var password = $.cookie('password');
        // autofill the fields
        $('#username').val(username);
        $('#password').val(password);
    }

    $("#login").on("click", function () {
        if ($('#remember').is(':checked')) {

            var username = $('#username').val();
            var password = $('#password').val();

            // set cookies to expire in 14 days
            $.cookie('username', username, {
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
            $.cookie('username', null);
            $.cookie('password', null);
            $.cookie('remember', null);
        }
    });
})