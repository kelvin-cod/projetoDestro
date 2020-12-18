var hoje = '';
var item = 0;
async function getDate() {
    hoje = await new Date();
    yr = hoje.getFullYear();
    mt = hoje.getMonth() + 1;
    dy = hoje.getDate();

    if (dy < 10) {
        dy = "0" + dy
    }
    return yr + "-" + mt + "-" + dy;
}
//$("#data").val(data.toLocaleDateString())

getDate().then(resp => {

    $("#data").val(resp)
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

function somarTotal() {

    let valorTotal = 0;

    $(".ValorTotal").each(function () {
        valorTotal += parseFloat($(this).text().replace('R$', '').replace('.',''));

    });
    $("#ValoTotalSomado").text(valorTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    }));
};

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


function getProduct(_id, Iditem) {
    //  let selectbox5 = $('[name="produtosServico"]');
    $(`#Total${Iditem}`).hide()
    let selectbox5 = $(`${_id}`);

    let http = `${https}/products/list/all/${user.idUser}`
    //let http = `http://localhost:3000/products/list/all/${user.idUser}`

    $.ajax({
        url: http,
        type: 'GET'
    }).done(async function (response) { //

        //selectbox5.find('option').remove();
        // selectbox5.append(`<option value=""></option>`)
        let resp = await $.each(response, function (i, item) {
            $('<option>').val(item.Preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })).text(item.Descricao).appendTo(selectbox5);

        });
        let val = await $(`#Prod${Iditem} option:selected`).val()

        $(`#Val${Iditem}`).text(val)


        let tot = await (parseFloat($(`#Val${Iditem}`).text().replace('R$', '')) * $(`#Quant${Iditem}`).val()).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        $(`#Total${Iditem}`).text(tot)
        $(`#Total${Iditem}`).show()
        somarTotal()
    });
}

function QuantVerifica(Iditem) {
    let tot = (parseFloat($(`#Val${Iditem}`).text().replace('R$', '')) * $(`#Quant${Iditem}`).val()).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    $(`#Total${Iditem}`).text(tot);
    somarTotal()
}


function verifica(_id) {
    $(`#Val${_id}`).text($(`#Prod${_id} option:selected`).val())
    let tot = (parseFloat($(`#Val${_id}`).text().replace('R$', '')) * $(`#Quant${_id}`).val()).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    $(`#Total${_id}`).text(tot)
    somarTotal()
}


async function init() {
    await getProvider();
    // await getProduct()
}

try {
    window.onload = init()
} catch (error) {
    console.log(error)
}