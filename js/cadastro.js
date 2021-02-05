let https = 'https://destrobackend.herokuapp.com';
let local = 'http://localhost:3000';

function Cadastrar() {
    let http = `${https}/user/create`;

    let user = {
        username: $("#username").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        tipo: 1
    };

    if ($("#email").val() == "") {
        toastr.error("Campo Email esta vazio", {
            positionClass: "toast-top-right"
        });

        $("#email").focus();
        $("#gif").hide();
        return;
    }

    if ($("#password").val() == "") {
        toastr.error("Campo Senha esta vazio", {
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
        toastr.success("Cadastro concluido", {
            positionClass: "toast-top-right"
        });

        setTimeout(function () {
            window.location.href = "../login.html";
        }, 1500);


    }).fail(err => {

        if (err.responseJSON.message == "Failed! Email ja esta em Uso!") {
            toastr.error("Email ja cadastrado", {
                positionClass: "toast-top-right"
            });
            $("#email").focus();
            $("#gif").hide();
            return
        } else if (err.responseJSON.message == "User Not found.") {
            toastr.error("Usuário não Cadastrado", {
                positionClass: "toast-top-right"
            });
            $("#gif").hide();
            return
        } else {
            // console.log(err.responseJSON.message)
        }
    })
}