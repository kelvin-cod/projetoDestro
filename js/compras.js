var hoje = '';
var item = 0;
let Compra = {
    Usuario: "",
    idEmpresa: 0,
    Fornecedor: 0,
    Tipo: 0,
    Dat: '',
    Concluida: "Aberto",
    DatPrevEntrega: '',
    DatEntrega: '',
    Obs: '',
    Produtos: []
}
let https = 'https://destrobackend.herokuapp.com';
let local = 'http://localhost:3000';
user = {
    idUser: 1,
    idEmpresa: 1,
    name: "Destro"
}

/**_______________________________________________________________________ */
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

    // $("#data").val(resp)
});
let newData = new Date
$("#data").val(newData.toLocaleDateString())
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
        valorTotal += parseFloat($(this).text().replace('R$', '').replace('.', ''));

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
            $('<option>').val(d.IdFornecedor).text(d.Nom).appendTo(selectbox4);
        });
    });
}

function getShop() {
    let http = `${local}/shop/list/all/${user.idEmpresa}`
    $.ajax({
        url: http,
        type: 'GET'

    }).done(function (response) {

        console.log(response)
    })
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
            })).text(item.Descricao).attr("val", item.IdProduto).appendTo(selectbox5);

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

$("#novoCompras").on("click", () => {

    item = 01;
    $("#formCompras")[0].reset();
    getDate().then(resp => {

        $("#data").val(resp)
    });

    $(`#products-table`).html("");
    $("#ValoTotalSomado").text("R$ 0,00");

})

$("#confirmar").on("click", () => {
    let http = `${local}/shop/create`;
    //let http = `http://localhost:3000/shop/create`;
    Compra.idEmpresa = user.idEmpresa;
    Compra.Usuario = user.name
    Compra.Dat = $("#data").val()
    Compra.DatEntrega = $("#DatEntrega").val();
    Compra.DatPrevEntrega = $("#DatPrevEntrega").val();
    Compra.Fornecedor = parseInt($("#fornecedor option:selected").val());
    Compra.Tipo = parseInt($("#tipo option:selected").val());
    Compra.Obs = $("#Obs").val();

    let prodTotal = $("#products-table").find('tr').length
    Compra.Produtos = [] // zera o array

    for (let i = 0; i < prodTotal; i++) {

        let obj = {
            idEmpresa: 0,
            Quant: 0,
            Produto: 0
        }

        obj.idEmpresa = user.idEmpresa
        obj.Quant = parseInt($(`#Quant${i + 1}`).val());
        obj.Produto = parseInt($(`#Prod${i + 1} option:selected`).attr('val'))
        Compra.Produtos.push(obj) // preenche o array
    }

    try {
        console.log(Compra)
        $.ajax({
            url: http,
            type: 'POST',
            data: Compra
        }).done(function (response) {
            toastr.success("Compra Realizada!")
            //console.log(response)
        })

    } catch (error) {
        console.log(error)
    }

})
/**_______________________________________________________________________________________ */
function init() {
    getProvider();
    getShop();
    // await getProduct()
}

try {
    window.onload = init()
} catch (error) {
    console.log(error)
}
/**________________________TABELAS_______________________________________________ */
(function ($) {
    var item = 01;

    AddTableRow = function (tabela) {

        let newRow = $("<tr>");
        let cols = "";
        if (tabela == "products-table") {
            autoItem("Produtos");
            cols += `<td scope="row" class="itemProdutos">${item}</td>`;
            cols +=
                `<td><select name="" id="Prod${item}" class="form-control" onchange="verifica(${item})"></select></td>`;
            cols +=
                `<td style="width:140px" ><input class="form-control" type="number" min="1" value="1" id="Quant${item}" onchange="QuantVerifica(${item})"></td>`;
            cols += `<td id="Val${item}"> </td>`;
            cols += `<td id="Total${item}" class="ValorTotal"> ${ $(`#Quant${item}`).val()} </td>`;


            newRow.append(cols);

            $(`#products-table`).append(newRow);

            getProduct(`#Prod${item}`, `${item}`)
            somarTotal()
            item += 1

        } else if (tabela == "tabelaFaturamento") {
            autoItem("Faturamento");
            cols += `<td scope="row" class="itemFaturamento">${item}</td>`;
            cols += '<td >&nbsp;</td>';
            cols += '<td>&nbsp;</td>';
            cols += '<td>&nbsp;</td>';
            cols += '<td class="valor-calculado">000,00</td>';
            cols +=
                '<td ><select name="" id="" class="form-control"> <option value="1">Dinheiro</option><option value="2">Crédito</option><option value="3">Débito</option><option value="4">Cheque Vista</option><option value="5">Cheque Prazo</option></select></td>';
            cols += '<td>000,00</td>';
            cols += '<td>&nbsp;</td>';
            cols +=
                '<td><button class="btn btn-warning btn-custom"><i class="fa fa-pencil "></i></button>        <button class="btn btn-danger  btn-custom"><i class="fa fa-trash"></i></button></td>'
            newRow.append(cols);

            $(`#tabelaFaturamento`).append(newRow);
        }

        // return false;
    };

})(jQuery);