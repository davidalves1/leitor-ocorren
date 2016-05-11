// Instancia o método de leitura de arquivo da API do HTML5
var fileReader = new FileReader();

// Carrega a o método da API para leitura do arquivo ao carregar a página
window.onload = function init() {
    fileReader.onload = lerArquivo;
};

// Função para chamar a leitura do arquivo ao carregá-lo
function obterArquivo(inputArquivo) {
    var arquivo = inputArquivo.files[0];
    fileReader.readAsText(arquivo);
}

// Realiza a leitura do arquivo e retorna os dados para a div de exibição
function lerArquivo(e) {
    // Passa os dados do arquivo para um aray onde cada índice é uma linha do arquivo
    var fileArr = e.target.result.split('\n');

    // Monta a div que irá exibir os dados
    var cnpj = fileArr[2].slice(3, 17);
    var div = '<p>CNPJ: ' + formataCnpj(cnpj) + '</p>';

    div += '<p>Transportadora: ' + fileArr[2].slice(17, 57) + '</p>';

    div += '<div class="panel panel-default">';
    div += '<div class="panel-heading">Ocorrências</div>';
    div += '<table class="table"><thead><th>Código</th><th>Descrição</th></thead>';

    // Passa em cada linha do arquivo
    for (var i = 0; i < fileArr.length; i++) {
        div += '<tr>';

        var fileLine = fileArr[i].split(',');

        for (var j = 0; j < fileLine.length; j++) {
            // Verifica se o registro é de uma ocorrência
            if (fileLine[j].slice(0, 3) == '342') {
                var ocorrencia = dadosOcorrencia(fileLine[j].slice(28, 30));

                div += '<td>' + ocorrencia.cod + '</td>';
                div += '<td>' + ocorrencia.descricao + '</td>';
            }
        };

        div += '</tr>';
    };

    div += '</table>';

    // Seta a div montada com os dados
    var exibeArquivo = document.getElementById('exibeArquivo')

    // Exibe os dados
    exibeArquivo.innerHTML = div;

};

var formataCnpj = function(cnpj) {
    return cnpj.slice(0, 2) + '.' +
        cnpj.slice(2, 5) + '.' +
        cnpj.slice(5, 8) + '/' +
        cnpj.slice(8, 12) + '-' +
        cnpj.slice(12, 14);
};

function dadosOcorrencia(cod) {
    var listaOcorrencias = [
        {cod: '00', descricao: "Processo de Transporte já Iniciado"},
        {cod: '01', descricao: "Entrega Realizada Normalmente"},
        {cod: '02', descricao: "Entrega Fora da Data Programada"},
        {cod: '03', descricao: "Recusa por Falta de Pedido de Compra"},
        {cod: '04', descricao: "Recusa por Pedido de Compra Cancelado"},
        {cod: '05', descricao: "Falta de Espaço Físico no Depósito do Cliente Destino"},
        {cod: '06', descricao: "Endereço do Cliente Destino não Localizado"},
        {cod: '07', descricao: "Devolução não Autorizada pelo Cliente"},
        {cod: '08', descricao: "Preço Mercadoria em Desacordo com o Pedido Compra"},
        {cod: '09', descricao: "Mercadoria em Desacordo com o Pedido Compra"},
        {cod: '10', descricao: "Cliente Destino somente Recebe Mercadoria com Frete Pago"},
        {cod: '11', descricao: "Recusa por Deficiência Embalagem Mercadoria"},
        {cod: '12', descricao: "Redespacho não Indicado"},
        {cod: '13', descricao: "Transportadora não Atende a Cidade do Cliente Destino"},
        {cod: '14', descricao: "Mercadoria Sinistrada"},
        {cod: '15', descricao: "Embalagem Sinistrada"},
        {cod: '16', descricao: "Pedido de Compras em Duplicidade"},
        {cod: '17', descricao: "Mercadoria fora da Embalagem de Atacadista"},
        {cod: '18', descricao: "Mercadorias Trocadas"},
        {cod: '19', descricao: "Reentrega Solicitada pelo Cliente"},
        {cod: '20', descricao: "Entrega Prejudicada por Horário/Falta de Tempo Hábil"},
        {cod: '21', descricao: "Estabelecimento Fechado"},
        {cod: '22', descricao: "Reentrega sem Cobrança do Cliente"},
        {cod: '23', descricao: "Extravio de Mercadoria em Trânsito"},
        {cod: '24', descricao: "Mercadoria Reentregue ao Cliente Destino"},
        {cod: '25', descricao: "Mercadoria Devolvida ao Cliente de Origem"},
        {cod: '26', descricao: "Nota Fiscal Retida pela Fiscalização"},
        {cod: '27', descricao: "Roubo de Carga"},
        {cod: '28', descricao: "Mercadoria Retida até Segunda Ordem"},
        {cod: '29', descricao: "Cliente Retira Mercadoria na Transportadora"},
        {cod: '30', descricao: "Problema com a Documentação (Nota Fiscal e/ou CTRC)"},
        {cod: '31', descricao: "Entrega com Indenização Efetuada"},
        {cod: '32', descricao: "Falta com Solicitação de Reposição"},
        {cod: '33', descricao: "Falta com Busca/Reconferência"},
        {cod: '34', descricao: "Cliente Fechado para Balanço"},
        {cod: '35', descricao: "Quantidade de Produto em Desacordo (Nota Fiscal e/ou Pedido)"},
        {cod: '36', descricao: "Extravio de documentos pela Cia. Aérea - Cód. Aéreo"},
        {cod: '37', descricao: "Extravio de carga pela Cia. Aérea – Cód. Aéreo"},
        {cod: '39', descricao: "Corte de carga na pista–Cód. Aéreo"},
        {cod: '40', descricao: "Aeroporto fechado na origem - Cód. Aéreo"},
        {cod: '41', descricao: "Pedido de Compra Incompleto"},
        {cod: '42', descricao: "Nota Fiscal com Produtos de Setores Diferentes"},
        {cod: '43', descricao: "Feriado Local/Nacional"},
        {cod: '44', descricao: "Excesso de Veículos"},
        {cod: '45', descricao: "Cliente Destino Encerrou Atividades"},
        {cod: '46', descricao: "Responsável de Recebimento Ausente"},
        {cod: '47', descricao: "Cliente Destino em Greve"},
        {cod: '48', descricao: "Aeroporto fechado no destino - Cód. Aéreo"},
        {cod: '49', descricao: "Vôo cancelado - Cód. Transp. Aéreo"},
        {cod: '50', descricao: "Greve nacional (Greve Geral)"},
        {cod: '51', descricao: "Mercadoria Vencida (Data de Validade Expirada)"},
        {cod: '52', descricao: "Mercadoria Redespachada (Entregue para Redespacho)"},
        {cod: '53', descricao: "Mercadoria não foi Embarcada, Permanecendo na Origem"},
        {cod: '54', descricao: "Mercadoria Embarcada sem CTRC ou CTRC não Embarcado"},
        {cod: '55', descricao: "Endereço Transp. de Redespacho não localizado/não informado 056 Cliente não Aceita Mercadoria com Pagamento de Reembolso 057 Transp. não atende a cidade da transportadora de redespacho 058 Quebra do Veiculo de Entrega"},
        {cod: '59', descricao: "Cliente sem Verba para Pagar o Frete"},
        {cod: '60', descricao: "Endereço de Entrega Errado"},
        {cod: '61', descricao: "Cliente sem Verba para Reembolso"},
        {cod: '62', descricao: "Recusa da Carga por Valor de Frete Errado"},
        {cod: '63', descricao: "Identificação do Cliente não Informada/Enviada/Insuficiente 064 Cliente não Identificado/Cadastrado"},
        {cod: '65', descricao: "Entrar em Contato com o Comprador"},
        {cod: '66', descricao: "Troca não Disponível"},
        {cod: '67', descricao: "Fins Estatísticos"},
        {cod: '68', descricao: "Data de Entrega Diferente do Pedido"},
        {cod: '69', descricao: "Substituição Tributária"},
        {cod: '70', descricao: "Sistema Fora do Ar"},
        {cod: '71', descricao: "Cliente Destino não Recebe Pedido Parcial"},
        {cod: '72', descricao: "Cliente Destino só Recebe Pedido Parcial"},
        {cod: '73', descricao: "Redespacho somente com Frete Pago"},
        {cod: '74', descricao: "Funcionário não autorizado a Receber Mercadorias"},
        {cod: '75', descricao: "Mercadoria Embarcada para Rota Indevida"},
        {cod: '76', descricao: "Estrada/Entrada de Acesso Interditada"},
        {cod: '77', descricao: "Cliente Destino Mudou de Endereço"},
        {cod: '78', descricao: "Avaria Total"},
        {cod: '79', descricao: "Avaria Parcial"},
        {cod: '80', descricao: "Extravio Total"},
        {cod: '81', descricao: "Extravio Parcial"},
        {cod: '82', descricao: "Sobra de Mercadoria sem Nota Fiscal"},
        {cod: '83', descricao: "Mercadoria em poder da SUFRAMA para Internação"},
        {cod: '84', descricao: "Mercadoria Retirada para Conferência"},
        {cod: '85', descricao: "Apreensão Fiscal da Mercadoria"},
        {cod: '86', descricao: "Excesso de Carga/Peso"},
        {cod: '87', descricao: "Férias Coletivas"},
        {cod: '88', descricao: "Recusado, aguardando negociação"},
        {cod: '89', descricao: "Aguardando refaturamento das mercadorias"},
        {cod: '90', descricao: "Recusado pelo Redespachante"},
        {cod: '91', descricao: "Entrega Programada"},
        {cod: '92', descricao: "Problemas Fiscais"},
        {cod: '93', descricao: "Aguardando carta de correção"},
        {cod: '94', descricao: "Recusa por divergência nas condições de pagamento"},
        {cod: '95', descricao: "Carga aguardando vôo conexão - Cód. Transp. Aéreo"},
        {cod: '96', descricao: "Carga sem embalagem própria para transp. Aéreo - Cód. Aéreo"},
        {cod: '97', descricao: "Carga com dimensão superior ao porão da aeronave - Cód. Aéreo"},
        {cod: '98', descricao: "Chegada na cidade ou filial de destino"},
        {cod: '99', descricao: "Outros tipos de ocorrências não especificados acima"},
    ];

    if (typeof(cod) == 'string') {
        cod = parseInt(cod);
    }

    return listaOcorrencias[cod];
};
