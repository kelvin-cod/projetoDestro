 user = {
     idUser: 1,
     idEmpresa: 1,
     nome: "Destro"
 }
 let https = 'https://destrobackend.herokuapp.com'
 var d = new Date();
 let local = 'http://localhost:3000';
 $("#prodDataUltAlteracao").val(d.toLocaleDateString());
 $("#prodUltAlteracao").val(user.nome)
 // alert(d.toLocaleString());
 function somarTotal() {

     var valorCalculadoPago = 0;

     $(".valor-calculado").each(function () {

         if ($(this).val() == "") {
             valorCalculadoPago += 0
         } else {
             valorCalculadoPago += parseFloat($(this).val());
         }


     });

     $("#prodPrecoCusto").val(valorCalculadoPago.toFixed(2))
 };

 function postProduct() {
     let obj = {};

     obj = {
         descricao: $("#prodNome").val(),
         tipo: parseInt($("#prodTipo").val()),
         ncm: $("#prodNcm").val(),
         cest: $("#prodCest").val(),
         precoCompra: $("#prodPrecoCompra").val(),
         valorFrete: $("#prodValorFrete").val(),
         adicionais: $("#prodAdicionais").val(),
         precoCusto: $("#prodPrecoCusto").val(),
         ultAlteracao: $("#prodUltAlteracao").val(),
         unidades: $("#prodUnidades").val(),
         dataUltimaAlteracao: $("#prodDataUltAlteracao").val(),
         obs: $("#prodObs").val(),
         idEmpresa: user.idEmpresa
     };
     // console.log(obj)
     //let http = `http://localhost:3000/provider/create`

     if (obj.descricao == "") {
         toastr.error("Nome/Descrição inválida")
         return false
     }
     let http = `${https}/products/create`
     // console.log(obj)
     $.ajax({
         url: http,
         type: 'POST',
         data: obj
     }).then(function (response) { //
         //console.log(response)
         toastr.success("Produto/Serviço Criado")
         $('#tabelaProduto').html("");
         resetForm();
         getProduct();
         //getProduct();

     });
 }


 function getProduct() {
     let http = `${https}/products/list/all/${user.idUser}`
     //let http = `http://localhost:3000/products/list/all/${user.idUser}`
     let tbl = '';
     $.ajax({
         url: http,
         type: 'GET'
     }).then(function (response) { //
        $('#tabelaProduto').html("");
         $.each(response, function (i, item) {

             tbl +=
                 '<tr onclick="getOneProduct(' + item.IdProduto + ')">' +
                 '<td  >' + item.Descricao + '</td>' +
                 '</tr>';
         });

         $('#tabelaProduto').append(tbl);

     });
 }

 function getOneProduct(_id) {
     let http = `${https}/products/list/${_id}`
     // let http = `http://localhost:3000/products/list/${_id}`
     $.ajax({
         url: http,
         type: 'GET'
     }).then(function (response) { //
         // console.log(response)
         let data = new Date(response[0].dataCadastro)

         $("#btnAtualiza").html("");
         $("#btnAtualiza").append(`
            <button class="btn btn-success font-weight-bold"
            type="button" onclick="updateProduct(${response[0].IdProduto})">
            <i class="fa fa-check"></i>
            Atualizar
            </button>`);

         $("#btnExcluir").html("");
         $("#btnExcluir").append(`
        <button class="btn btn-danger font-weight-bold"
        type="button" onclick="excluirModal(${response[0].IdProduto})">
        <i class="fa fa-trash"></i> Excluir </button>`);


         $("#prodNome").val(response[0].Descricao);
         //$("#prodTipo").val(response[0].D);
         $("#prodNcm").val(response[0].Ncm);
         $("#prodCest").val(response[0].Cest);
         $("#prodPrecoCompra").val(response[0].Preco.toFixed(2));
         $("#prodValorFrete").val(response[0].ValorFrete.toFixed(2));
         $("#prodAdicionais").val(response[0].Adicionais.toFixed(2));
         $("#prodPrecoCusto").val(response[0].PrecoVenda.toFixed(2));
         $("#prodUltAlteracao").val(response[0].UltimaAlteracao);
         $("#prodDataUltAlteracao").val(response[0].DataUltimaAlteracao);
         $("#prodObs").val(response[0].Obs);
         $("select[name=prodUnidades]").val(response[0].Unidades);
         $('select[name="tipo"]').val(response[0].Tipo);
         $("#cadastro").text(data.toLocaleDateString());

     }).done(() => {
         somarTotal()
     });
     GettablesProducts(_id);


 }

 function updateProduct(_id) {
     let obj = {};
     obj = {
         descricao: $("#prodNome").val(),
         tipo: parseInt($("#prodTipo").val()),
         ncm: $("#prodNcm").val(),
         cest: $("#prodCest").val(),
         precoCompra: $("#prodPrecoCompra").val(),
         valorFrete: $("#prodValorFrete").val(),
         adicionais: $("#prodAdicionais").val(),
         precoCusto: $("#prodPrecoCusto").val(),
         ultAlteracao: $("#prodUltAlteracao").val(),
         unidades: $("#prodUnidades").val(),
         dataUltimaAlteracao: $("#prodDataUltAlteracao").val(),
         obs: $("#prodObs").val()

     };
     // console.log(obj)
     //let http = `http://localhost:3000/provider/create`
     let http = `${https}/products/update/${_id}`
     // console.log(obj)
     $.ajax({
         url: http,
         type: 'PUT',
         data: obj
     }).done(function (response) { //
         //console.log(response)
         toastr.success("Atualizado com sucesso!", {
             positionClass: "toast-top-right"
         })

         $('#tabelaProduto').html("");
         resetForm()
         getProduct();
         //  location.reload();

     }).fail(function (error) {
         console.log(error)
     })
 };

 function GettablesProducts(_id) {

     // console.log(obj)
     //let http = `http://localhost:3000/provider/create`
     let http = `${https}/products/tables/${_id}`
     // console.log(obj)
     let tbl = '';
     let tbl2 = '';
     let Data;
     let auxMes;
     $('#ultimasCompras').html("");
     $('#VendaMes').html("");
     $.ajax({
         url: http,
         type: 'GET'
     }).done(function (response) { //
         // console.log(response)

         $.each(response, function (i, item) {
             Data = new Date(item.Dat)
             if ((Data.getMonth() + 1) < 10) {
                 auxMes = "0" + (Data.getMonth() + 1)
             } else {
                 auxMes = (Data.getMonth() + 1)
             }
             tbl +=
                 '<tr>' +
                 '<td>' + (Data.getDate()) + "/" + auxMes + "/" + Data.getFullYear() + '</td>' +
                 '<td>' + item.TotalQuant + '</td>' +
                 '<td>' + item.TotalVenda.toLocaleString("pt-BR", {
                     style: "currency",
                     currency: "BRL"
                 }) + '</td>' +
                 '<td>' + item.Nom + '</td>' +
                 '</tr>';

             tbl2 += '<tr>' +
                 '<td>' + auxMes + "/" + Data.getFullYear() + '</td>' +
                 '<td>' + item.TotalQuant + '</td>' +
                 '</tr>';
         });

         $('#ultimasCompras').append(tbl);
         $('#VendaMes').append(tbl2);

     }).fail(function (error) {
         console.log(error)
     })
 }


 function excluirModal(_id) {
     id = _id
     $('#excluirModal').modal('show', 'focus');
 }

 $('#modal-btn-sim').on("click", () => {

     //let http = 'https://destrobackend.herokuapp.com/data/delete/usuario/' + _id
     let http = `${https}/products/delete/${_id}`
     $.ajax({
         url: http,
         type: 'DELETE'
     }).then(function (response) { //
         //console.log(response)
         $('#excluirModal').modal('hide');
         $('#exampleModalCenter').modal('hide');

     });
 });

 let altera
 $("#alterarDados").on("click", function () {

     // habilita o campo 

     altera += 0
     if (altera == 0) {

         $("input").prop("disabled", true);
         $("select").prop("disabled", true);
         $("#buscaProduto").attr("Disabled", false);

         altera += 1


     } else {
         altera = 0

         $("#msgEdicao").show()
         $("input").prop("disabled", false);
         $("select").prop("disabled", false);
         $("#prodUltAlteracao").prop("disabled", true);
         $("#prodDataUltAlteracao").prop("disabled", true);
         $("#buscaProduto").attr("Disabled", false);
     }
 })

 function aoIniciar() {
     getProduct();


     $("input").prop("disabled", true);
     $("select").prop("disabled", true);

     $("#btnAtualiza").prop("disabled", true);
     $("#buscaProduto").attr("Disabled", false);
 }

 function resetForm() {

     $("#formProduto")[0].reset();
     $("#prodUltAlteracao").val(user.nome);
     $("#prodDataUltAlteracao").val(d.toLocaleDateString());
     $("#btnAtualiza").html("");
     $("#btnAtualiza").append(`
       <button class="btn btn-success font-weight-bold"
       type="button" onclick="postProduct()">
       <i class="fa fa-check"></i>
       Enviar
       </button>`);
 }

 $("#novoProduto").on("click", () => {
     $("input").prop("disabled", false);
     $("select").prop("disabled", false);
     $("#prodUltAlteracao").prop("disabled", true);
     $("#prodDataUltAlteracao").prop("disabled", true);

     $("#formProduto")[0].reset();
     $("#prodUltAlteracao").val(user.nome);
     $("#prodDataUltAlteracao").val(d.toLocaleDateString());
     $("#btnAtualiza").html("");
     $("#btnAtualiza").append(`
        <button class="btn btn-success font-weight-bold"
        type="button" onclick="postProduct()">
        <i class="fa fa-check"></i>
        Enviar
        </button>`);


 })

/*
 $('#buscaProduto').bind('keydown keypress keyup change', function () {
     var search = this.value;
     var $li = $("#tabelaProduto tr td").hide();
     $li.filter(function () {
         return $(this).text().indexOf(search) >= 0;
     }).show();
 });
 */
 /**_______________________________________________________________________________________ */
 var typingTimer; //timer identifier
 var doneTypingInterval = 1500; //time in ms, 1 second for example
 $("#buscaProduto").on("keydown", () => {

     clearTimeout(typingTimer);

     if ($('#buscaProduto').val()) {
         typingTimer = setTimeout(doneTyping, doneTypingInterval);
     }
     if ($('#buscaProduto').val() === "") {
         return getProduct()

     }

 });

 function doneTyping() {
     let http = `${https}/products/search`;
     let tbl = '';
     let Obj = {
         Filter: $('#buscaProduto').val()
     };


     if (Obj.Filter == "") {
    
         getProduct();
         return false;
     };

     $.ajax({
         url: http,
         type: 'POST',
         data: Obj
     }).then(function (response) { //
     // console.log(response)
      $('#tabelaProduto').html("");
         if (response.length == 0) {
             if ($("#resultSearch").text() == "") {
                 $("#resultSearch").text("Não foi Localizada nenhum Produto!");
             }

             $("#resultSearch").show();
         } else {
             $.each(response, function (i, item) {

                 tbl +=
                     '<tr onclick="getOneProduct(' + item.IdProduto + ')">' +
                     '<td  >' + item.Descricao + '</td>' +
                     '</tr>';
             });

             $('#tabelaProduto').append(tbl);
             $("#resultSearch").hide();
             //  $('#tblCompras ').append(tbl);
         }
     });
 }

 window.onload = aoIniciar()