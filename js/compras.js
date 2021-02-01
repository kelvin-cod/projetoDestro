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
    Produtos: [],
    Faturamentos: []
}
let https = 'https://destrobackend.herokuapp.com';
let local = 'http://localhost:3000';
user = {
    idUser: 1,
    idEmpresa: 1,
    name: "Destro"
};

let array = [];
var numItem = 1;
var numCompra = 0;
var rowTblProdutc;

$(".valor-calculado").text(00, 00. toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
}))
/**_______________________________________________________________________ */
async function getDate() {
    hoje = await new Date();
    yr = hoje.getFullYear();
    mt = hoje.getMonth() + 1;
    dy = hoje.getDate();

    if (dy < 10) {
        dy = "0" + dy
    }
    if (mt < 10) {
        mt = "0" + mt
    }
    return yr + "-" + mt + "-" + dy;
}
//$("#data").val(data.toLocaleDateString())
let dataAmericana = '';
getDate().then(resp => {

    dataAmericana = resp;
    $("#DatPrevEntrega").attr("min", dataAmericana);
});
let newData = new Date
$("#data").val(newData.toLocaleDateString());

function removeLimite() {
    $("#DatPrevEntrega").attr("min", "1999-01-01");
};

function Limite(params) {
    $(`#${params}`).attr("min", dataAmericana);
};

$(function () {

    var valorCalculado = 0;

    $(".valor-calculado").each(function () {
        valorCalculado += parseFloat($(this).text().replace(",", "."));
    });

    $("#qtdtotal").text(valorCalculado.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    }));

    $(".valor-calculado").text(valorCalculado.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    }))

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
        valorTotal += parseFloat($(this).text().replace('R$', '').replace(',', '.'));

    });

    $("#ValorTotalSomado").text(valorTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    }));

    $(".valor-calculado").text(valorTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    }))
};

function autoItem(tabela) {

    let aux = parseInt($(`.item${tabela}`).last().text())
    item = aux + 1;
    return item
};


function formata_data(data) { // dd/mm/yyyy -> yyyy-mm-dd
    data_formatada = data.substr(6, 4) + '-' + data.substr(3, 2) + '-' + data.substr(0, 2) + ' 00:00:00';
    return new Date(data_formatada);
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
        //  console.log(response)
        selectbox4.find('option').remove();

        $.each(response, function (i, d) {
            $('<option>').val(d.IdFornecedor).text(d.Nom).appendTo(selectbox4);
        });
    });
};

function getShop() {
    let http = `${https}/shop/list/all/${user.idEmpresa}`;
    let tbl = '';
    let Data;
    $.ajax({
        url: http,
        type: 'GET'

    }).done(function (response) {
        $('#tblCompras').html("");
        $("#OrdemCompra").text(response[0].idCompra + 1)
        $.each(response, function (i, item) {
            Data = response[i].Dat.slice(8, 10) + "/" + response[i].Dat.slice(5, 7) + "/" + response[i].Dat.slice(0, 4)
            tbl +=
                '<tr scope="row" onclick="getOneShop(' + item.idCompra + ')">' +
                '<td  >' + Data + '</td>' +
                '<td  >' + item.idCompra + '</td>' +
                '<td  >' + item.Fornecedor + '</td>' +
                '</tr>';

        });
        $('#tblCompras').html(tbl);
        //  $('#tblCompras ').append(tbl);
    });
};

//adiciona os valors a tabela de produto/serviço
function getProduct(_id, Iditem, parametro) {
    //  let selectbox5 = $('[name="produtosServico"]');
    // 
    $(`#Total${Iditem}`).hide()
    let selectbox5 = $(`${_id}`);

    let http = `${https}/products/list/all/${user.idEmpresa}`
    //let http = `http://localhost:3000/products/list/all/${user.idUser}`

    $.ajax({
        url: http,
        type: 'GET'
    }).done(async function (response) { //

        //selectbox5.find('option').remove();
        // selectbox5.append(`<option value=""></option>`)
        let resp = await $.each(response, function (i, item) {

            $('<option>').val(item.IdProduto).text(item.Descricao)
                .attr("valor", item.PrecoVenda.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })).appendTo(selectbox5);

        });

        if (parametro == 2) {


        } else {
            let val = await $(`#Prod${Iditem} option:selected`).attr("valor");
            console.log(val)
            $(`#Val${Iditem}`).text(val)
        }

        let tot = await (parseFloat($(`#Val${Iditem}`).text().replace('R$', '').replace(",", ".")) * $(`#Quant${Iditem}`).val()).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        $(`#Total${Iditem}`).text(tot);
        $(`#Total${Iditem}`).show();
        somarTotal();
    });
}

function getOneShop(_id) {
    let http = `${https}/shop/list/${_id}`;
    // let http = `${https}/shop/list/${_id}`
    //zera o numero item

    $("#ValorTotalSomado").text("R$ 0,00");
    let cols = '';
    let cols2 = '';

    $.ajax({
        url: http,
        type: 'GET'
    }).done(function (response) { //
        numItem = 1;
        console.log(response)
        numCompra = response[0].idCompra;

        let Data = response[0].Dat.slice(8, 10) + "/" + response[0].Dat.slice(5, 7) + "/" + response[0].Dat.slice(0, 4)

        $(`#products-table tbody`).html("");
        $("#data").val(Data);
        $("#DatPrevEntrega").val(response[0].DatPrevEntrega);
        $("#Obs").val(response[0].Obs);
        $("select[name=fornecedor]").val(response[0].Fornecedor);
        $("#OrdemCompra").text(response[0].idCompra);

        if ((response.length > 0) && (response[0].IdProduto != null)) {
            array = [];

            $.each(response, function (i, item) {

                cols = `<tr ondblclick="excluirProduto(${numItem})" idItem="${item.IdItem}" id="row${numItem}">`
                //<td scope="row" class="itemProdutos">${numItem}</td>`;
                cols +=
                    `<td><select name="${numItem}" id="Prod${numItem}" idItem="${item.IdItem}" class="form-control" onchange="verifica(${numItem})"></select></td>`;
                cols +=
                    `<td style="width:140px" >
                        <input class="form-control" type="number" min="1" 
                        id="Quant${numItem}" onchange="QuantVerifica(${numItem})"></td>`;
                cols += `<td id="Val${numItem}"> </td>`;
                cols += `<td id="Total${numItem}" class="ValorTotal"> ${ $(`#Quant${numItem}`).val()} </td></tr>`;



                $(`#products-table > tbody`).append(cols);

                $(`#Quant${numItem}`).val(item.Quant);
                $(`#Val${numItem}`).text(item.PrecoVenda.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                }));

                getProduct(`#Prod${numItem}`, `${numItem}`, 2);
                array.push(item.IdProduto)
                //  $(`#Prod${numItem}`).val(item.IdProduto);
                //  console.log(numItem, item.IdProduto)
                //$(`select[name=${numItem}]`).val(item.IdProduto);
                if (item.Forma == null) {

                } else {


                    let newRow = $(`<tr scope="row" id="rowFat${numItem}" rowId="${numItem}" class="rowFaturamento"> `);
                    //  cols += `<td class="itemFaturamento">${numItem}</td>`;
                    cols2 += `<td width="10%"><span class="form-control">${item.DatPagto.slice(8,10) + "/" + item.DatPagto.slice(5,7) + "/"  + item.DatPagto.slice(0,4)}</span></td>`;
                    cols2 += `<td width="15%" ><input type="text" id="documento${numItem}" class="form-control"></td>`;
                    cols2 += `<td width="10%"><input type="date" id="vencimento${numItem}" class="form-control" min="${dataAmericana}"></td>`;

                    cols2 += `<td width="10%" ><span class="valor-calculado form-control">R$ 00,00</span></td>`;
                    cols2 +=
                        `<td width="20%" >
                <select name="FormaPagamento" id="Forma${numItem}" class="form-control">
                    <option value="1">Dinheiro</option>
                    <option value="2">Crédito</option>
                    <option value="3">Débito</option>
                    <option value="4">Cheque Vista</option>
                    <option value="5">Cheque Prazo</option>
                </select>
                </td>`;
                    cols2 += `<td width="10%" onchange="SomarValPago()">    
                <input type="text" id="ValPago${numItem}" class="form-control TotalPago" value="0" pattern="[0-9]+$">   
                </td>`;

                    cols2 += `<td width="10%">
                <span  class="form-control" > ${item.DatPagto.slice(8,10) + "/" + item.DatPagto.slice(5,7) + "/"  + item.DatPagto.slice(0,4)  }</span>
                </td>`;
                    cols2 += `<td width="120px">
                <button class="btn btn-danger btn-custom" onclick="removeLinha(${numItem})">
                <i class="fa fa-trash"></i>
                </button>
                </td>`;
                    //<button class="btn btn-warning btn-custom"><i class="fa fa-pencil "></i></button>
                    newRow.append(cols2);

                    $(`#tabelaFaturamento`).append(newRow);
                    $(`#vencimento${numItem}`).val(item.Vencimento);
                    $(`#ValPago${numItem}`).val(item.ValPagamento);
                    $(`#Forma${numItem} option:selected`).val(item.Forma);
                    somarTotal();
                }
                numItem++;
            });

        }

        return numCompra;
    }).then(() => {
        //  SelecionaProdutos();
        $("#divConfirma").html("");
        $("#divConfirma").append(`<button class="btn btn-success font-weight-bold" type="button" id="atualizar"
        onclick="updateProduct(${numCompra})">
        <i class="fa fa-check" ></i>
        Atualizar
        </button>`);
        $("#divApagar").html("");
        $("#divApagar").append(`
        <button class="btn btn-danger font-weight-bold" type="button" id="Excluir" data-toggle="modal" data-target="#excluirModal">
        <i class="fa fa-trash"></i>
        Excluir
        </button>`);
    });


    setTimeout(function () {
        SelecionaProdutos();

    }, 1500);
};

function SelecionaProdutos() {
    let num = 1;
    for (let i = 0; i < array.length; i++) {
        $(`select[name=${num}]`).val(array[i]);
        // console.log(i, $(`select[name=${num}]`).val())
        num++;
    }
};

function QuantVerifica(Iditem) {
    let tot = (parseFloat($(`#Val${Iditem}`).text().replace('R$', '')) * $(`#Quant${Iditem}`).val()).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    $(`#Total${Iditem}`).text(tot);
    somarTotal();
};

function verifica(_id) {

    $(`#Val${_id}`).text($(`#Prod${_id} option:selected`).attr('valor'))
    let tot = (parseFloat($(`#Val${_id}`).text().replace('R$', '').replace(",", ".")) * $(`#Quant${_id}`).val()).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    $(`#Total${_id}`).text(tot);
    somarTotal();
};

$("#novoCompras").on("click", () => {
    /*
    numItem = 1;
    $("#formCompras")[0].reset();

    getDate().then(resp => {
        $("#data").val(resp);
    });

    $(`#products-table`).html("");
    $("#ValorTotalSomado").text("R$ 0,00");

    $("#divConfirma").html("");
    $("#divConfirma").append(`<button class="btn btn-success font-weight-bold" type="button" id="confirmar">
    <i class="fa fa-check"></i>Confirmar</button>`);
    $("#divApagar").html("");
    $("#divApagar").append(`
    <button class="btn btn-danger font-weight-bold" type="button" id="apagar" >
    <i class="fa fa-trash"></i>
    Apagar
    </button>`);*/
    location.reload()
});


$("#confirmar").on("click", () => {
    let http = `${https}/shop/create`;
    //let http = `http://localhost:3000/shop/create`;
    Compra.idEmpresa = user.idEmpresa;
    Compra.Usuario = user.name;
    Compra.Dat = (newData.getFullYear()) + "/" + ((newData.getMonth() + 1)) + "/" + newData.getDate();
    Compra.DatEntrega = $("#DatEntrega").val();
    Compra.DatPrevEntrega = $("#DatPrevEntrega").val();
    Compra.Fornecedor = parseInt($("#fornecedor option:selected").val());
    Compra.Tipo = parseInt($("#tipo option:selected").val());
    Compra.Obs = $("#Obs").val();

    let prodTotal = $("#products-table tbody").find('tr').length;
    let fatuTotal = $("#tabelaFaturamento tbody").find('tr').length;
    Compra.Produtos = []; // zera o array
    Compra.Faturamentos = []; // zera o array

    for (let i = 0; i < prodTotal; i++) {

        let obj = {
            idEmpresa: 0,
            Quant: 0,
            Produto: 0
        };

        obj.idEmpresa = user.idEmpresa;
        obj.Quant = parseInt($(`#Quant${i + 1}`).val());
        obj.Produto = parseInt($(`#Prod${i + 1} option:selected`).val())
        Compra.Produtos.push(obj) // preenche o array

    };

    if (prodTotal == 0) {
        toastr.error("Sem Produto Adicionado", {
            positionClass: "toast-top-right"
        })

        return false;
    };
    let array = []

    $(".rowFaturamento").each(function () {
        array.push($(this).attr("rowId"))
    });

    for (let i = 0; i < fatuTotal; i++) {

        let obj = {
            data: '',
            documento: '',
            vencimento: 0,
            valor: 0,
            formaPagamento: 0,
            valorPago: 0,
            idEmpresa: 0,
            idUsuario: 0,
            idCompra: 0,
            dataPagto: ''
        };
        //     console.log($(`#ValorPago${array[i]}`).val())
        obj.data = (newData.getFullYear()) + "/" + ((newData.getMonth() + 1)) + "/" + newData.getDate();
        obj.documento = $(`#documento${array[i]}`).val();
        obj.vencimento = $(`#vencimento${array[i]}`).val();
        obj.valor = parseFloat($(`#qtdtotal`).text().replace("R$", "").replace(",", "."));
        obj.formaPagamento = parseInt($(`#Forma${array[i]}`).val());
        obj.valorPago = $(`#ValPago${array[i]}`).val().replace(",", ".");
        obj.idEmpresa = user.idEmpresa;
        obj.idUsuario = user.idUser;
        obj.dataPagto = (newData.getFullYear()) + "/" + ((newData.getMonth() + 1)) + "/" + newData.getDate();

        Compra.Faturamentos.push(obj); // preenche o array
    };
    console.log(Compra)

    $.ajax({
        url: http,
        type: 'POST',
        data: Compra
    }).then(function (response) {

        location.reload();
        toastr.success("Compra Realizada!", {
            positionClass: "toast-top-right"
        });

        getShop();


    }).fail(() => {
        toastr.fail("Compra não Realizada!", {
            positionClass: "toast-top-right"
        })

    });


});

$("#apagar").on("click", () => {

    $(`#${rowTblProdutc}`).remove();
    somarTotal();
});

$("#products-table tbody").on('click', 'tr', function () {
    rowTblProdutc = $(this).attr("id");

});


function excluir() {
    let _id = $(`#${rowTblProdutc}`).attr("iditem");
    let http = `${https}/shop/item/delete/${_id}`;
    //console.log(http)

    if (rowTblProdutc == undefined) {
        $("#excluirModal").modal("hide");
        return false
    }

    $.ajax({
        url: http,
        type: 'POST'
    }).then(function (response) {
        toastr.success("Item Deletado!", {
            positionClass: "toast-top-right"
        })

        // location.reload();
        // getShop();

        getOneShop(numCompra);
        $("#excluirModal").modal("hide");
    });

};


function updateProduct(_id) {
    let http = `${https}/shop/update/${_id}`;
    // let http = `${https}/shop/update/${_id}`;
    let datPrevisaoEntrega = new Date($("#DatPrevEntrega").val());
    let datEntrega = new Date($("#DatEntrega").val());
    let array = [];

    Compra.idEmpresa = user.idEmpresa;
    Compra.Usuario = user.name
    Compra.Dat = (newData.getFullYear()) + "/" + ((newData.getMonth() + 1)) + "/" + newData.getDate();
    Compra.DatEntrega = (datEntrega.getFullYear()) + "/" + ((datEntrega.getMonth() + 1)) + "/" + datEntrega.getDate();
    Compra.DatPrevEntrega = (datPrevisaoEntrega.getFullYear()) + "/" + ((datPrevisaoEntrega.getMonth() + 1)) + "/" + datPrevisaoEntrega.getDate();
    Compra.Fornecedor = parseInt($("#fornecedor option:selected").val());
    Compra.Tipo = parseInt($("#tipo option:selected").val());
    Compra.Obs = $("#Obs").val();

    let prodTotal = $("#products-table tbody").find('tr').length;
    let fatuTotal = $("#tabelaFaturamento tbody").find('tr').length;
    Compra.Produtos = [] // zera o array
    Compra.Faturamentos = [] // zera o array

    for (let i = 0; i < prodTotal; i++) {

        let obj = {
            idEmpresa: 0,
            Quant: 0,
            Produto: 0,
            idItem: 0
        };

        obj.idItem = parseInt($(`#Prod${i + 1}`).attr("iditem"));
        obj.idEmpresa = user.idEmpresa;
        obj.Quant = parseInt($(`#Quant${i + 1}`).val());
        obj.Produto = parseInt($(`#Prod${i + 1} option:selected`).val());

        if (isNaN(obj.idItem)) {
            obj.idItem = 0;
        }

        Compra.Produtos.push(obj); // preenche o array
    };

    $(".rowFaturamento").each(function () {
        array.push($(this).attr("rowId"))
    });

    for (let i = 0; i < fatuTotal; i++) {

        let obj = {
            data: '',
            documento: '',
            vencimento: 0,
            valor: 0,
            formaPagamento: 0,
            valorPago: 0,
            idEmpresa: 0,
            idUsuario: 0,
            idCompra: 0,
            dataPagto: ''
        };
        //     console.log($(`#ValorPago${array[i]}`).val())
        obj.data = (newData.getFullYear()) + "/" + ((newData.getMonth() + 1)) + "/" + newData.getDate();
        obj.documento = $(`#documento${array[i]}`).val();
        obj.vencimento = $(`#vencimento${array[i]}`).val();
        obj.valor = parseFloat($(`#qtdtotal`).text().replace("R$", "").replace(",", "."));
        obj.formaPagamento = parseInt($(`#Forma${array[i]}`).val());
        obj.valorPago = $(`#ValPago${array[i]}`).val().replace(",", ".");
        obj.idEmpresa = user.idEmpresa;
        obj.idUsuario = user.idUser;
        obj.dataPagto = (newData.getFullYear()) + "/" + ((newData.getMonth() + 1)) + "/" + newData.getDate();

        Compra.Faturamentos.push(obj); // preenche o array
    };

    console.log(Compra)


    $.ajax({
        url: http,
        type: 'PUT',
        data: Compra
    }).then(function (response) {

        //console.log(response)


        location.reload();
        toastr.success("Compra Atualizada!", "Sucesso", {
            positionClass: "toast-top-right"
        });

        getShop();

    });

};
/**_______________________________________________________________________________________ */
var typingTimer; //timer identifier
var doneTypingInterval = 1500; //time in ms, 1 second for example
$("#buscaCompra").on("keydown", () => {

    clearTimeout(typingTimer);

    if ($('#buscaCompra').val()) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
    if ($('#buscaCompra').val() === "") {
        return getShop()

    }

});

function doneTyping() {
    let http = `${https}/shop/search`;
    let tbl = '';
    let Data;
    let Obj = {
        Filter: $('#buscaCompra').val()
    };

    if (Obj.Filter.indexOf("/") != -1) {
        $("#resultSearch").text("Para datas utilize o padrao DD/MM/AAAA");
        Obj.Filter = Obj.Filter.substring(6, 10) + "-" + Obj.Filter.substring(3, 5) + "-" + Obj.Filter.substring(0, 2)
    };

    if (Obj.Filter == "") {
        getShop()
        return false;
    };

    $.ajax({
        url: http,
        type: 'POST',
        data: Obj
    }).then(function (response) { //
        // console.log(response)
        if (response.length == 0) {
            if ($("#resultSearch").text() == "") {
                $("#resultSearch").text("Não foi Localizada nenhuma Compra!");
            }

            $("#resultSearch").show();
        } else {
            $.each(response, function (i, item) {
                $("#resultSearch").hide();
                Data = new Date(item.Dat)
                tbl +=
                    '<tr scope="row" onclick="getOneShop(' + item.idCompra + ')">' +
                    '<td  >' + (Data.getDate() + 1) + "/" + ((Data.getMonth() + 1)) + "/" + Data.getFullYear() + '</td>' +
                    '<td  >' + item.idCompra + '</td>' +
                    '<td  >' + item.Fornecedor + '</td>' +
                    '</tr>';
            });
            $('#tblCompras').html(tbl);
            //  $("resultSearch").hide();
            //  $('#tblCompras ').append(tbl);
        }
    });
}
//somar o falor pago da segunda tabela
function SomarValPago() {

    let valorTotal = 0;

    $(".TotalPago").each(function () {
        valorTotal += parseFloat($(this).val().replace(',', '.'));

    }); //soma os items coma mesma classe

    $("#qtdtotalPago").text(valorTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })); //exibe o total

};

function removeLinha(_id) {
    $(`#rowFat${_id}`).remove();

    // index = index -1;
}
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
let index = 1;
/**_______________________________________________________________________________________ */
function AddTableRow(tabela) {

    let newRow = $(`<tr scope="row" id="row${numItem}">`);
    let cols = "";
    if (tabela == "products-table") {
        autoItem("Produtos");
        // cols += `<td class="itemProdutos">${numItem}</td>`;
        cols +=
            `<td><select name="" id="Prod${numItem}" class="form-control" onchange="verifica(${numItem})"></select></td>`;
        cols +=
            `<td style="width:140px" >
                    <input class="form-control" type="number" min="1" 
                    value="1" id="Quant${numItem}" onchange="QuantVerifica(${numItem})"></td>`;
        cols += `<td id="Val${numItem}"> </td>`;
        cols += `<td id="Total${numItem}" class="ValorTotal"> ${ $(`#Quant${numItem}`).val()} </td>`;

        newRow.append(cols);

        $(`#products-table`).append(newRow);

        getProduct(`#Prod${numItem}`, `${numItem}`, 1);
        somarTotal();
        numItem++;
        // console.log("numItem", numItem)
    } else if (tabela == "tabelaFaturamento") {

        autoItem("Faturamento");
        numItem = index;
        newRow = $(`<tr scope="row" id="rowFat${numItem}" rowId="${numItem}" class="rowFaturamento"> `);
        //  cols += `<td class="itemFaturamento">${numItem}</td>`;
        cols += `<td width="10%"><span class="form-control">${newData.toLocaleDateString()}</span></td>`;
        cols += `<td width="15%" ><input type="text" id="documento${numItem}" class="form-control"></td>`;
        cols += `<td width="10%"><input type="date" id="vencimento${numItem}" class="form-control" min="${dataAmericana}"></td>`;
        cols += `<td width="10%" ><span class="valor-calculado form-control">R$ 00,00</span></td>`;
        cols +=
            `<td width="20%" >
             <select name="" id="Forma${numItem}" class="form-control">
                <option value="1">Dinheiro</option>
                <option value="2">Crédito</option>
                <option value="3">Débito</option>
                <option value="4">Cheque Vista</option>
                <option value="5">Cheque Prazo</option>
             </select>
             </td>`;
        cols += `<td width="10%" onchange="SomarValPago()">    
        <input type="text" id="ValPago${numItem}" class="form-control TotalPago" value="0" pattern="[0-9]+$">   
        </td>`;

        cols += `<td width="10%">
        <span  class="form-control" > ${newData.toLocaleDateString()}</span>
        </td>`;
        cols +=
            `<td width="120px"><button class="btn btn-danger btn-custom" onclick="removeLinha(${numItem})"><i class="fa fa-trash"></i></button>
         </td>`;
        //<button class="btn btn-warning btn-custom"><i class="fa fa-pencil "></i></button>
        newRow.append(cols);

        $(`#tabelaFaturamento`).append(newRow);
        index++;
        somarTotal();
        //console.log(dataAmericana)
    }

    // return false;
};