 user = {
    idUser: 1,
    idEmpresa: 1
}
var d = new Date();
console.log(d)
$("#prodUltAlteracao").val(d.toLocaleDateString());
// alert(d.toLocaleString());

function postProvider() {
    let obj = {};
    obj = {
        descricao: $("#prodNome").val(),
        tipo: parseInt($("#prodTipo").val()),
        ncm: $("#prodNcm").val(),
        cest: $("#prodCest").val(),
        precoCompra: $("#prodPrecoCompra").val(),
        valorFrete: $("#prodValorFrete").val(),
        adicionais: $("#prodAdicionais").val(),
        precoVenda: $("#prodPrecoVenda").val(),
        ultAlteracao: $("#prodUltAlteracao").val(),
        dataUltimaAlteracao: $("#prodDataUltAlteracao").val(),
        obs: $("#prodObs").val(),
        idEmpresa: user.idEmpresa
    };
    console.log(obj)
  //let http = `http://localhost:3000/provider/create`
  let http = 'https://destrobackend.herokuapp.com/products/create'
  // console.log(obj)
  $.ajax({
      url: http,
      type: 'POST',
      data: obj
  }).then(function (response) { //
      //console.log(response)
      // alert("Atualizado com sucesso!")
     // getProvider();

  });
}
window.onload = ""