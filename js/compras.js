var hoje = '';
var item = 0;
async function getDate() {
    hoje = await new Date();
    yr = hoje.getFullYear();
    mt = hoje.getMonth() + 1;
    dy = hoje.getDate();
    return yr + "-" + mt + "-" + dy;
}
//$("#data").val(data.toLocaleDateString())

getDate().then(resp => {
    document.getElementById("data").value = resp
});

$(function () {

    var valorCalculado = 0;

    $(".valor-calculado").each(function () {
        valorCalculado += parseFloat($(this).text());
    });
    $("#qtdtotal").text(valorCalculado.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    }));

});
$(function () {

    var valorCalculadoPago = 0;

    $(".valor-pago-calculado").each(function () {
        valorCalculadoPago += parseFloat($(this).text());
    });
    $("#qtdtotalPago").text(valorCalculadoPago.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    }));
});


function autoItem(tabela) {

    let aux = parseInt($(`.item${tabela}`).last().text())
    item = aux + 1;
    return item
};


/*____________________________________________________________________ */
let https = 'https://destrobackend.herokuapp.com'
user = {
    idUser: 1,
    idEmpresa: 1,
    nome: "Destro"
}

function getProvider() {
    var selectbox4 = $('#fornecedor');
    let http = `${https}/provider/list/all/${user.idEmpresa}`
    // let http = 'http://localhost:3000/provider/list/all/1'

    $.ajax({
        url: http,
        type: 'GET'
    }).done(function (response) { //
        // console.log(response)
        selectbox4.find('option').remove();

        $.each(response, function (i, d) {
            $('<option>').val(d.idFornecedor).text(d.Nom).appendTo(selectbox4);
        });
    });
}


function getProduct() {
    let selectbox5 = $('[name="produtosServico"]');
    let http = `${https}/products/list/all/${user.idUser}`
    //let http = `http://localhost:3000/products/list/all/${user.idUser}`

    $.ajax({
        url: http,
        type: 'GET'
    }).done(function (response) { //
        console.log(response)
        selectbox5.find('option').remove();

        $.each(response, function (i, item) {
            $('<option>').val(item.idProduto).text(item.Descricao).appendTo(selectbox5);
        });
    });
}


window.onload = getProvider()