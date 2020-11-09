$("#celular").mask("(00) 00000-0000");
$("#cep").mask("00000-000");

/*função cep correios*/
var typingTimer; //timer identifier
var doneTypingInterval = 1000; //time in ms, 1 second for example

$("#cep").keydown(function () {
    clearTimeout(typingTimer);
    if ($('#cep').val) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
})

function doneTyping() {
    let cep = $('#cep').val();
    const key = "Fx03yD7mTXbZ57X7LtdGjUW3l5eswMF9&app_secret=6WcBEPTDX9wzl90y7uBSaruT6tohhqWJe2I3wDYYI1s6aAi4"

    let viacep = `https://viacep.com.br/ws/${cep}/json/`

    $.ajax({
        url: viacep,
        type: 'GET'
    }).then(function (response) { //
        console.log(response)
        $("#bairro").val(response.bairro);
        $("#logradouro").val(response.logradouro);
        $("#endereco").val(response.endereco);
        $("#cidade").val(response.localidade);
        $("#estado").val(response.uf);
    });
}



function enviar () {

    let obj = JSON.stringify({
        nome:  $("#nome").val(),
        apelido:  $("#apelido").val(),
        documento:  $("#documento").val(),
        rgie:  $("#rgie").val(),
        tipo:  $("#tipo").val(),
        cep:  $("#cep").val(),
        logradouro:  $("#logradouro").val(),
        bairro:  $("#bairro").val(),
        cidade:  $("#cidade").val(),
        complemento:  $("#complemento").val(),
        estado:  $("#estado").val(),
        codIbge:  $("#codIbge").val(),
        sexo:  $("#sexo").val(),
        celular:  $("#celular").val(),
        email:  $("#email").val(),
        usuarioPrincipal:  $("#usuarioPrincipal").val(),
        senhaPrincipal:  $("#senhaPrincipal").val(),
        smtp:  $("#smtp").val(),
        portalSmtp:  $("#portalSmtp").val(),
        senhaSmtp:  $("#senhaSmtp").val(),
        emailSmtp:  $("# emailSmtp").val()
    });

    let http = ``

    $.ajax({
        url: http,
        type: 'PUt',
        data: obj
    }).then(function (response) { //
     console.log(response)
    });
};

function getdata(){
    let http = 'https://destrobackend.herokuapp.com/data/get/1'

    $.ajax({
        url: http,
        type: 'GET'
    }).then(function (response) { //
     console.log(response)
     $("#nome").val(response[0].nome)
    });

}

window.onload = getdata();