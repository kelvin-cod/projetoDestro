$("#FornCelular").mask("(00) 00000-0000");
$("#FornCep").mask("00000-000");

/*função cep correios*/
var typingTimer; //timer identifier
var doneTypingInterval = 1000; //time in ms, 1 second for example
user = {
    idUser: 1,
    idEmpresa: 1,
    nome: "Destro"
}

let local = 'http://localhost:3000';

$("#FornCep").keydown(function () {
    clearTimeout(typingTimer);
    if ($('#FornCep').val) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
})

function doneTyping() {
    let cep = $('#FornCep').val();
    const key = "Fx03yD7mTXbZ57X7LtdGjUW3l5eswMF9&app_secret=6WcBEPTDX9wzl90y7uBSaruT6tohhqWJe2I3wDYYI1s6aAi4"

    let viacep = `https://viacep.com.br/ws/${cep}/json/`

    $.ajax({
        url: viacep,
        type: 'GET'
    }).then(function (response) { //
        $("#FornBairro").val(response.bairro);
        $("#FornLogradouro").val(response.logradouro);
        $("#FornEndereco").val(response.endereco);
        $("#FornCidade").val(response.localidade);
        $("#FornEstado").val(response.uf);
    });
}

function getOneProvider(_id) {
    let http = `https://destrobackend.herokuapp.com/provider/list/${_id}`
    //let http = `http://localhost:3000/provider/list/${_id}`
    $.ajax({
        url: http,
        type: 'GET'
    }).then(function (response) { //
        let data = new Date(response[0].dataCadastro)
        // console.log(response)

        $("#FornNomeRazao").val(response[0].Nom);
        $("#FornApelido").val(response[0].Apelido);
        $("#FornDocumento").val(response[0].Doc);
        $("#FornRgIe").val(response[0].Rgle);
        $("#FornCep").val(response[0].Cep);
        $("#FornLogradouro").val(response[0].Logradouro);
        $("#FornComplemento").val(response[0].Complemento);
        $("#FornEstado").val(response[0].Estado);
        $("#FornCidade").val(response[0].Cidade);
        $("#FornBairro").val(response[0].Bairro);
        $("#FornNumero").val(response[0].Num);
        $("#FornEmail").val(response[0].Email);
        // $("#ibge").val(response[0].CodIbge);
        $("#FornCelular").val(response[0].Celular);
        $("#FornPontoReferencia").val(response[0].PontoReferencia);
        //$("#nascimento").val(response[0].Nascimento);
        $('select[name="tipo"]').val(response[0].TipoPessoa);
        $("#cadastro").text(data.toLocaleDateString());

        $("#btnAtualiza").html("");
        $("#btnAtualiza").append(`
            <button class="btn btn-success font-weight-bold"
             type="button" onclick="updateProvider(${response[0].IdFornecedor})">
        <i class="fa fa-check"></i>
        Atualizar
    </button>`);

        $("#btnExcluir").html("");
        $("#btnExcluir").append(`
        <button class="btn btn-danger font-weight-bold"
         type="button" onclick="excluirModal(${response[0].IdFornecedor})">
    <i class="fa fa-trash"></i>
  Excluir
    </button>`);
    });
    tablesProviders(_id);
    tablesProvidersShop(_id)
}

function tablesProviders(_id) {
    // let http = `https://destrobackend.herokuapp.com/provider/list/tables/${_id}`
    let http = `http://localhost:3000/provider/list/tables/${_id}`
    let soma = 0
    let tbl2 = '';
    $.ajax({
        url: http,
        type: 'GET'
    }).then(function (response) {
        console.log(response)
        $.each(response, function (i, item) {
            soma += item.Quant;
            Data = new Date(item.Dat)

            tbl2 += '<tr scope="row" >' +
                '<td  >' + (Data.getDate()) + "/" + ((Data.getMonth() + 1)) + "/" + Data.getFullYear() + '</td>' +
                '<td  >' + item.Descricao + '</td>' +
                '<td  >' + item.PrecoCusto.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                }) + '</td>' +
                '<td  >' + (item.PrecoCusto * item.Quant).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                }) + '</td>' +
                '</tr>';
        });


        $("#ultimosComprados").html("");

        $("#ultimosComprados").append(tbl2);

        $("#quantUltimos").text(soma)
    })
};

function tablesProvidersShop(_id) {
    // let http = `https://destrobackend.herokuapp.com/provider/list/tables/${_id}`
    let http = `http://localhost:3000/provider/list/tables/shop/${_id}`
    let tbl = '';
    $.ajax({
        url: http,
        type: 'GET'
    }).then(function (response) {
        console.log(response)
        $.each(response, function (i, item) {

            Data = new Date(item.Dat)
            tbl +=
                '<tr scope="row" >' +
                '<td  >' + (Data.getDate()) + "/" + ((Data.getMonth() + 1)) + "/" + Data.getFullYear() + '</td>' +
                '<td  >' + item.idCompra + '</td>' +
                '<td  >' + item.Concluida + '</td>' +
                '<td  >' + "Destro" + '</td>' + //item.idEmpresa
                '</tr>';

            $("#comprasFornecedor").html("");

            $("#comprasFornecedor").append(tbl);

            $("#quantCompras").text(response.length);
        })
    })
};

function postProvider() {
    let obj = {};
    obj = {
        nome: $("#FornNomeRazao").val(),
        apelido: $("#FornApelido").val(),
        documento: $("#FornDocumento").val(),
        rgie: $("#FornRgIe").val(),
        tipo: parseInt($("#FornTipo").val()),
        cep: $("#FornCep").val(),
        logradouro: $("#FornLogradouro").val(),
        num: $("#FornNumero").val(),
        bairro: $("#FornBairro").val(),
        cidade: $("#FornCidade").val(),
        complemento: $("#FornComplemento").val(),
        estado: $("#FornEstado").val(),
        //  codIbge: $("#ibge").val(),
        celular: $("#FornCelular").val(),
        email: $("#FornEmail").val(),
        pontoReferencia: $("#FornPontoReferencia").val(),
        idEmpresa: 1

    };

    if (obj.nome == "" || obj.rgie == "") {
        return false
    }
    //let http = `http://localhost:3000/provider/create`
    let http = 'https://destrobackend.herokuapp.com/provider/create'
    // console.log(obj)
    $.ajax({
        url: http,
        type: 'POST',
        data: obj
    }).then(function (response) { //
        //console.log(response)
        // alert("Atualizado com sucesso!")
        getProvider();

    });
};

function updateProvider(_id) {
    let obj = {};
    obj = {
        nome: $("#FornNomeRazao").val(),
        apelido: $("#FornApelido").val(),
        documento: $("#FornDocumento").val(),
        rgie: $("#FornRgIe").val(),
        tipo: parseInt($("#FornTipo").val()),
        cep: $("#FornCep").val(),
        logradouro: $("#FornLogradouro").val(),
        num: $("#FornNumero").val(),
        bairro: $("#FornBairro").val(),
        cidade: $("#FornCidade").val(),
        complemento: $("#FornComplemento").val(),
        estado: $("#FornEstado").val(),
        //  codIbge: $("#ibge").val(),
        celular: $("#FornCelular").val(),
        email: $("#FornEmail").val(),
        pontoReferencia: $("#FornPontoReferencia").val()
    };


    let http = `https://destrobackend.herokuapp.com/provider/update/${_id}`
    // console.log(obj)
    $.ajax({
        url: http,
        type: 'PUT',
        data: obj
    }).then(function (response) { //
        //console.log(response)
        // alert("Atualizado com sucesso!")
        $('#tabelaFornecedor').html("");
        getProvider();

        $('#fornForm input').val("");
    });
};

function excluirModal(_id) {
    id = _id
    $('#excluirModal').modal('show', 'focus');
}

$('#modal-btn-sim').on("click", () => {

    //let http = 'https://destrobackend.herokuapp.com/data/delete/usuario/' + _id
    let http = `https://destrobackend.herokuapp.com/provider/delete/${_id}`
    $.ajax({
        url: http,
        type: 'DELETE'
    }).then(function (response) { //
        //console.log(response)
        $('#excluirModal').modal('hide');
        $('#exampleModalCenter').modal('hide');

    });
})

function deleteProvider(_id) {

    let http = `https://destrobackend.herokuapp.com/provider/delete/${_id}`
    // console.log(obj)
    $.ajax({
        url: http,
        type: 'DELETE',
        data: obj
    }).then(function (response) { //
        //console.log(response)
        // alert("Atualizado com sucesso!")
        $('#tabelaFornecedor').html("");
        getProvider();
        $('#fornForm input').val("");
    });
};


let https = 'https://destrobackend.herokuapp.com'

function getProvider() {
    let http = `${https}/provider/list/all/${user.idEmpresa}`
    // let http = 'http://localhost:3000/provider/list/all/1'
    let tbl = '';
    $.ajax({
        url: http,
        type: 'GET'
    }).then(function (response) { //
        $('#tabelaFornecedor').html("");
        $.each(response, function (i, item) {

            tbl +=
                '<tr onclick="getOneProvider(' + item.IdFornecedor + ')">' +
                '<td scope="row" colspan="2">' + item.Nom + '</td>' +
                '</tr>';
        });

        $('#tabelaFornecedor').append(tbl);

    });
}

let altera
$("#alterarDados").on("click", function () {

    // habilita o campo 

    altera += 0
    if (altera == 0) {
        $("#msgEdicao").hide()
        $("input").prop("disabled", true);
        $("#buscaFornecedor").attr("Disabled", false);
        $("select").prop("disabled", true);
        altera += 1
    } else {
        altera = 0

        $("#msgEdicao").show()
        $("input").prop("disabled", false);
        $("#buscaFornecedor").attr("Disabled", false);
        $("select").prop("disabled", false);
    }
})
/**_______________________________________________________________________________________ */

$("#buscaFornecedor").on("keydown", () => {

    clearTimeout(typingTimer);

    if ($('#buscaFornecedor').val()) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
    if ($('#buscaFornecedor').val() === "") {
        return getProvider()

    }

});

function doneTyping() {
    let http = `${https}/provider/search`;
    let tbl = '';
    let Obj = {
        Filter: $('#buscaFornecedor').val()
    };


    if (Obj.Filter == "") {

        getProvider();
        return false;
    };

    $.ajax({
        url: http,
        type: 'POST',
        data: Obj
    }).then(function (response) { //
        // console.log(response)
        $('#tabelaFornecedor').html("");
        if (response.length == 0) {
            if ($("#resultSearch").text() == "") {
                $("#resultSearch").text("Não foi Localizada nenhum Produto!");
            }

            $("#resultSearch").show();
        } else {

            $.each(response, function (i, item) {

                tbl +=
                    '<tr onclick="getOneProvider(' + item.IdFornecedor + ')">' +
                    '<td scope="row" colspan="2">' + item.Nom + '</td>' +
                    '</tr>';
            });

            $('#tabelaFornecedor').append(tbl);
            //  $('#tblCompras ').append(tbl);
        }
    });
}

function aoIniciar() {
    getProvider();
    $("input").prop("disabled", true);
    $("#buscaFornecedor").attr("Disabled", false);
    $("select").prop("disabled", true);

}


window.onload = aoIniciar();