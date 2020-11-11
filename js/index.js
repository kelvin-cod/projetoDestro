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



function enviar() {
    let obj = {};
    obj = {
        nome: $("#nomeRazao").val(),
        apelido: $("#apelido").val(),
        documento: $("#documento").val(),
        rgie: $("#rgIe").val(),
        tipo: parseInt($("#tipo").val()),
        cep: $("#cep").val(),
        logradouro: $("#logradouro").val(),
        num: $("#numero").val(),
        bairro: $("#bairro").val(),
        cidade: $("#cidade").val(),
        complemento: $("#complemento").val(),
        estado: $("#estado").val(),
        codIbge: "",
        sexo: parseInt($("#sexo").val()),
        celular: $("#celular").val(),
        nascimento: "2020/06/05",
        email: $("#email").val(),
        usuarioPrincipal: $("#usuarioPrincipal").val(),
        senhaPrincipal: $("#senhaPrincipal").val()
    };
    /*
     smtp: $("#smtp").val(),
            portaSmtp: $("#portaSmtp").val(),
            senhaSmtp: $("#senhaSmtp").val(),
            emailSmtp: $("#emailSmtp").val()
    */
    //let http = `http://localhost:3000/data/update/1`
    let http = 'https://destrobackend.herokuapp.com/data/update/1'

    $.ajax({
        url: http,
        type: 'PUT',
        data: obj
    }).then(function (response) { //
        //console.log(response)
        getdata();
    });
};

function getdata() {
    let http = 'https://destrobackend.herokuapp.com/data/get/1'

    $.ajax({
        url: http,
        type: 'GET'
    }).then(function (response) { //

        $("#nomeRazao").val(response[0].Nom);
        $("#apelido").val(response[0].Apelido);
        $("#documento").val(response[0].Doc);
        $("#rgIe").val(response[0].Rgle);
        $("#cep").val(response[0].Cep);
        $("#logradouro").val(response[0].Logradouro);
        $("#complemento").val(response[0].Complemento);
        $("#estado").val(response[0].Estado);
        $("#cidade").val(response[0].Cidade);
        $("#bairro").val(response[0].Bairro);
        $("#numero").val(response[0].Num);
        $("#email").val(response[0].Email);
        $("#celular").val(response[0].Celular);
        $("#nascimento").val(response[0].Nascimento);
        $("#usuarioPrincipal").val(response[0].UsuarioPrincipal);
        $("#senhaPrincipal").val(response[0].SenhaPrincipal);
        $('select[name="tipo"]').val(response[0].TipoPessoa);
        $('select[name="sexo"]').val(response[0].Sexo);
    });
}

function enviarUsuario() {
    let obj = {};
    obj = {
        nomeApelido: $("#nomeApelido").val(),
        tipoAcesso: parseInt($("#tipoAcesso").val()),
        senha: $("#senhaUsuario").val(),
        idEmpresa: 1
    };

    let http = 'https://destrobackend.herokuapp.com/data/usuario/1'
    console.log(obj)
    $.ajax({
        url: http,
        type: 'PUT',
        data: obj
    }).then(function (response) { //
        //console.log(response)
        getdata();
    });
};


function getUsuario() {
    let http = 'https://destrobackend.herokuapp.com/data/get/usuario/1'
    let tbl = ''
    $.ajax({
        url: http,
        type: 'GET'
    }).then(function (response) { //
        $.each(response, function (i, item) {

            tbl +=
                '<tr><td>' + item.nomeApelido +
                '</td><td>' + item.Tipo_Pedido

            '</td></tr>';
        });
        $('#tabelaUsuario').append(tbl);

    });
}



window.onload = getdata();