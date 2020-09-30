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
        console.log(response)
        $("#FornBairro").val(response.bairro);
        $("#FornLogradouro").val(response.logradouro);
        $("#FornEndereco").val(response.endereco);
        $("#FornCidade").val(response.localidade);
        $("#FornEstado").val(response.uf);
    });
}