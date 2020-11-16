$("#FornCelular").mask("(00) 00000-0000");
$("#FornCep").mask("00000-000");

/*função cep correios*/
var typingTimer; //timer identifier
var doneTypingInterval = 1000; //time in ms, 1 second for example

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

function getProvider() {
    let http = 'https://destrobackend.herokuapp.com/provider/list/1'

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
        // $("#ibge").val(response[0].CodIbge);
        $("#celular").val(response[0].Celular);
        //$("#nascimento").val(response[0].Nascimento);
        $('select[name="tipo"]').val(response[0].TipoPessoa);
        $("#cadastro").text(data.toLocaleDateString())
    });
}

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


    //let http = `http://localhost:3000/data/update/1`
    let http = 'https://destrobackend.herokuapp.com/provider/create'
console.log(obj)
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