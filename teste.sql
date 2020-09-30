SELECT TabVenda.IdVenda, TabCliente.Razao, TabFuncionario.IdFuncionario, TabFuncionario.Nom, 
TabVenda.Dat, TabCliente.IdCliente, TabFormaPagamento.descricaco, ConsTotVenda.SubTot
FROM (((TabCliente INNER JOIN TabVenda ON TabCliente.IdCliente = TabVenda.Cliente) 
LEFT JOIN TabFormaPagamento ON TabVenda.idFormaPagamento = TabFormaPagamento.idFormaPagamento) 
INNER JOIN TabFuncionario ON TabVenda.idFuncionario = TabFuncionario.IdFuncionario) 
INNER JOIN ConsTotVenda ON TabVenda.IdVenda = ConsTotVenda.IdVenda
WHERE (((TabVenda.IdVenda) 
Like ""+[formulários]![frmlocalizarfichavendedor].[txtnumficha] & "") 
AND ((TabCliente.Razao) Like ""+[formulários]![frmlocalizarfichavendedor].[txtrazao] & "") 
AND ((TabFuncionario.Nom) Like ""+[formulários]![frmlocalizarfichavendedor].[txtvendedor] & "") 
AND ((TabVenda.Dat) Between [formulários]![frmlocalizarfichavendedor].[datini] 
And [formulários]![frmlocalizarfichavendedor].[datfim]) AND ((TabFormaPagamento.descricaco)
 Like ""+[formulários]![frmlocalizarfichavendedor].[txttipo] & ""))
ORDER BY TabVenda.Dat;

SELECT TabVenda.IdVenda, TabCliente.Razao, TabFuncionario.IdFuncionario, TabFuncionario.Nom, 
TabVenda.Dat, TabCliente.IdCliente, TabFormaPagamento.descricaco
FROM ((TabCliente INNER JOIN TabVenda ON TabCliente.IdCliente = TabVenda.Cliente) 
LEFT JOIN TabFormaPagamento ON TabVenda.idFormaPagamento = TabFormaPagamento.idFormaPagamento) 
INNER JOIN TabFuncionario ON TabVenda.idFuncionario = TabFuncionario.IdFuncionario
WHERE (((TabVenda.IdVenda) 
Like ""+[formulários]![frmlocalizarfichavendedor].[txtnumficha] & "") 
AND ((TabCliente.Razao) Like ""+[formulários]![frmlocalizarfichavendedor].[txtrazao] & "")
 AND ((TabFuncionario.Nom) Like ""+[formulários]![frmlocalizarfichavendedor].[txtvendedor] & "") 
 AND ((TabVenda.Dat) Between [formulários]![frmlocalizarfichavendedor].[datini] 
 And [formulários]![frmlocalizarfichavendedor].[datfim]) AND ((TabFormaPagamento.descricaco)
  Like ""+[formulários]![frmlocalizarfichavendedor].[txttipo] & ""))
ORDER BY TabVenda.Dat;