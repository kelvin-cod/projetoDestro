testaPagto: Selmed([tabpagtocliente].[datpagto]  <>  null; null ; [tabpagtocliente].[datpagto])

testaCongelado: Selmed([tabitemgrupo].[datCongelado] <> null ; testaPagto; [tabitemgrupo].[datCongelado])


NovoCongelado: Selmed([tabitemgrupo].[datCongelado] É Negado Nulo;' testa se o campo e nulo ou nao
Selmed([tabpagtocliente].[datpagto] É Negado Nulo; Nulo;' testa o campo data de pagamento se e nulo ou nao; atribui o valor nulo se for
[tabpagtocliente].[datpagto];[tabitemgrupo].[datCongelado]))' se não for nulo atribuo o valor do campo