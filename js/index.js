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
        senhaPrincipal: $("#senhaPrincipal").val(),
        smtp: $("#smtp").val(),
        portaSmtp: $("#portaSmtp").val(),
        senhaSmtp: $("#senhaSmtp").val(),
        emailSmtp: $("#emailSmtp").val()

    };


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
        $("#smtp").val(response[0].smtp);
        $("#portaSmtp").val(response[0].portaSmtp);
        $("#senhaSmtp").val(response[0].senhaSmtp);
        $("#emailSmtp").val(response[0].emailSmtp);
    });
}

function enviarUsuario() {
    let obj = {};

    obj = {
        nomeUsuario: $("#nomeApelido").val(),
        tipoAcesso: parseInt($("#tipoAcesso").val()),
        senha: $("#senhaUsuario").val(),
        idEmpresa: 1
    };

    let http = 'https://destrobackend.herokuapp.com/data/usuario/1'
    // let http = 'http://localhost:3000/data/usuario/1'
    console.log(obj)
    $.ajax({
        url: http,
        type: 'POST',
        data: obj
    }).then(function (response) { //
        //console.log(response)
        $('#exampleModalCenter').modal('close', 'focus');
        getdata();
    });
};

function getUsuario() {
    let http = 'https://destrobackend.herokuapp.com/data/list/usuario/1'
    let tbl = '';
    let tipo = ''
    $.ajax({
        url: http,
        type: 'GET'
    }).then(function (response) { //
        console.log(response)
        $.each(response, function (i, item) {
            if (item.tipoAcesso == 1) {
                tipo = 'Administrador'
            } else {
                tipo = 'Básico'
            }
            tbl +=
                '<tr onclick="abrirModal(' + item.idUsuarioSistema + ')"><td>' + item.nomeUsuario + '</td>' +
                '<td>' + tipo + '</td>'
            '</tr>';
        });

        $('#tabelaUsuario').append(tbl);

    });
}

function abrirModal(_id) {
    let http = 'https://destrobackend.herokuapp.com/data/get/usuario/' + _id
    $("#footerModal").html('');
    $("input").prop("disabled", false);
    $.ajax({
        url: http,
        type: 'GET'
    }).then(function (response) { //
        $("#nomeApelido").val(response[0].nomeUsuario)
        $('select[name="tipoAcesso"]').val(response[0].tipoAcesso);
        $("#senhaUsuario").val(response[0].senha)
        $("#confirmaSenhaUsuario").val(response[0].senha)

        $("#footerModalBotao").hide()
        $("#footerModal").append(`
        <div><button type="button" class="btn btn-danger" data-dismiss="modal">
        <i class="fa fa-trash"></i>Excluir </button>
        <button type="button" class="btn btn-success" onclick="atualizaUsuario()">
        <i class="fa fa-check"></i> Atualizar </button></div>`);

        $('#exampleModalCenter').modal('show', 'focus');
    });


}

function atualizaUsuario() {
    $("#nomeApelido").val()
    $('select[name="tipoAcesso"]').val("");
    $("#senhaUsuario").val()
    $("#confirmaSenhaUsuario").val()

}

$("#adicionarUsuario").on("click", () => {
    $("#footerModalBotao").show()
    $("#footerModal").html('');
    $("#nomeApelido").val("")
    $('select[name="tipoAcesso"]').val("")
    $("#senhaUsuario").val("")
    $("#confirmaSenhaUsuario").val("")
    $("#footerModal").append(`
    <div><button type="button" class="btn btn-danger" data-dismiss="modal">
    <i class="fa fa-times"></i>Cancelar</button>
    <button type="button" class="btn btn-success" onclick="enviarUsuario()">
    <i class="fa fa-check"></i> Enviar </button></div>`);

    $('#exampleModalCenter').modal('show', 'focus');
})


let altera
$("#alterarDados").on("click", function () {

    // habilita o campo 

    altera += 0
    if (altera == 0) {
        $("#msgEdicao").hide()
        $("input").prop("disabled", true);
        altera += 1
    } else {
        altera = 0
   
        $("#msgEdicao").show()
        $("input").prop("disabled", false);
    }



})
window.onload = getdata(), getUsuario(), $("input").prop("disabled", true), $("#msgEdicao").hide();