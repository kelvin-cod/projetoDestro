$("#celular").mask("(00) 00000-0000");
$("#cep").mask("00000-000");

/*função cep correios*/
var typingTimer; //timer identifier
var doneTypingInterval = 1000; //time in ms, 1 second for example
let https = 'https://destrobackend.herokuapp.com';
let local = 'http://localhost:3000';
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
        $("#bairro").val(response.bairro);
        $("#logradouro").val(response.logradouro);
        $("#endereco").val(response.endereco);
        $("#cidade").val(response.localidade);
        $("#estado").val(response.uf);
        $("#ibge").val(response.ibge);
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
        codIbge: $("#ibge").val(),
        sexo: parseInt($("#sexo").val()),
        celular: $("#celular").val(),
        nascimento: $("#nascimento").val(),
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
        //  alert("Atualizado com sucesso!")
        getdata();

    });
};

function getdata() {
    let http = 'https://destrobackend.herokuapp.com/data/get/1'

    $.ajax({
        url: http,
        type: 'GET'
    }).then(function (response) { //
        let data = new Date(response[0].dataCadastro)
        console.log(response)

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
        $("#ibge").val(response[0].CodIbge);
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
        $("#cadastro").text(data.toLocaleDateString())
    });
}

function enviarUsuario() {
    let obj = {};
    if ($("#senhaUsuario").val() != $("#confirmaSenhaUsuario").val()) {
        toastr.error("As senhas não são iguais", {
            positionClass: "toast-top-right"
        });
        $("#confirmaSenhaUsuario").focus();
        return;
    }

    obj = {
        username: $("#nomeApelido").val(),
        tipo: parseInt($("#tipoAcesso").val()),
        password: $("#senhaUsuario").val(),
        idEmpresa: 1
    };

    let http = `${https}/user/create`;
    // let http = 'http://localhost:3000/data/usuario/1'

    $.ajax({
        url: http,
        type: 'POST',
        data: obj
    }).then(function (response) { //
        //console.log(response)
        toastr.success("Usuario Cadastrado", {
            positionClass: "toast-top-right"
        });
        $('#exampleModalCenter').modal('hide');
        getUsuario();
    });
};

function getUsuario() {
    let http = `${https}/data/list/usuario/1/`;
    let tbl = '';
    let tipo = ''
    $.ajax({
        url: http,
        type: 'GET'
    }).then(function (response) { //
        $('#tabelaUsuario').html("");
        $.each(response, function (i, item) {
            if (item.tipo == 1) {
                tipo = 'Administrador'
            } else {
                tipo = 'Básico'
            }
            tbl +=
                '<tr onclick="abrirModal(' + item.idUsuario + ')"><td>' + item.username + '</td>' +
                '<td>' + tipo + '</td>'
            '</tr>';
        });

        $('#tabelaUsuario').append(tbl);

    });
}

function abrirModal(_id) {
    // let http = 'https://destrobackend.herokuapp.com/data/get/usuario/' + _id
    let http = `${https}/data/get/usuario/${_id}`
    $.ajax({
        url: http,
        type: 'GET'
    }).then(function (response) { //

        console.log(response)
        $("#footerModal").html('');
        $("#nomeApelido").val(response[0].username)
        $('select[name="tipoAcesso"]').val(response[0].tipo);
        $("#senhaUsuario").val(response[0].senha)
        $("#confirmaSenhaUsuario").val(response[0].senha)

        $("#footerModalBotao").hide()
        $("#footerModal").append(`
        <div><button type="button" class="btn btn-danger mr-1" onclick="excluirModal(${_id})">
        <i class="fa fa-trash"></i>Excluir </button>
        <button type="button" class="btn btn-success" onclick="atualizaUsuario(${_id})">
        <i class="fa fa-check"></i> Atualizar </button></div>`);

        $('#exampleModalCenter').modal('show', 'focus');
    });

    $("input").prop("disabled", true)
}
let id

function excluirModal(_id) {
    id = _id
    $('#excluirModal').modal('show', 'focus');
}

$('#modal-btn-sim').on("click", () => {

    let http = 'https://destrobackend.herokuapp.com/data/delete/usuario/' + _id
    //let http = 'http://localhost:3000/data/delete/usuario/' + id
    $.ajax({
        url: http,
        type: 'DELETE'
    }).then(function (response) { //
        //console.log(response)
        $('#excluirModal').modal('hide');
        $('#exampleModalCenter').modal('hide');
        $("#tabelaUsuario").html('');

        getUsuario();
    });
})
$("#olho").on("mousedown",function () {
    $("#senhaUsuario").attr("type", "text");
});

$("#olho").on("mouseup", function () {
    $("#senhaUsuario").attr("type", "password");
});

function atualizaUsuario(_id) {
    let obj = {};
    obj = {
        nomeUsuario: $("#nomeApelido").val(),
        tipoAcesso: parseInt($("#tipoAcesso").val()),
        senha: $("#senhaUsuario").val()
    };

    let http = 'https://destrobackend.herokuapp.com/data/usuario/' + _id
    // let http = 'http://localhost:3000/data/usuario/1'

    $.ajax({
        url: http,
        type: 'PUT',
        data: obj
    }).then(function (response) { //
        //console.log(response)
        toastr.success("Usuario Atualizado", {
            positionClass: "toast-top-right"
        });

        $('#exampleModalCenter').modal('hide');
        $("#tabelaUsuario").html('');

        getUsuario();
    });

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




$('#exampleModalCenter').on('shown.bs.modal', function (e) {

    $("input").prop("disabled", false);
    $("select").prop("disabled", false);
})

$('#exampleModalCenter').on('hide.bs.modal', function (e) {
    $("input").prop("disabled", true);
    $("select").prop("disabled", true);
})

let altera
$("#alterarDados").on("click", function () {

    // habilita o campo 

    altera += 0
    if (altera == 0) {
        $("#msgEdicao").hide()
        $("input").prop("disabled", true);
        $("select").prop("disabled", true);
        altera += 1
    } else {
        altera = 0

        $("#msgEdicao").show()
        $("input").prop("disabled", false);
        $("select").prop("disabled", false);
    }
})


function aorecarregar() {
    getdata();
    getUsuario();
    $("input").prop("disabled", true);
    $("select").prop("disabled", true);
    $("#msgEdicao").hide();
}

window.onload = aorecarregar();