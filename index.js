exports.handler = async function  handler(event,context) {
    const ParmPost = event.date

    //Verifica se o parametro date foi preenchido
    if (ParmPost === '' || ParmPost === 'undefined'){
        return{
            statusCode: 200,
            body: JSON.stringify({message: `Favor informar um valor`})
        };
    }

    const dataAtual = new Date(ParmPost); //Gera a data a ser utilziada a partir do parametro
    

    //Identifica se a data gerada é valida, caso não, informa e exemplifica como preencher o campo
    if (isNaN(dataAtual)){
        return{
            statusCode: 200,
            body: JSON.stringify({message: `Favor inserir um valor válido de data. Ex: '2022,01,20'`})
        };
    }
    
    const proximaDataPalindroma = encontrarProximaDataPalindroma(dataAtual); //Chama a função principal que faz o processo de encontrar o próximo palindromo
    
    //Retorna o palindromo identificado
    return{
        statusCode: 200,
        body: JSON.stringify({message: `A próxima data palíndroma é ${proximaDataPalindroma}.`})
    };
};


    //Funções secundárias de filtragem de objeto data

    function verificarDataPalindroma(data) { //Recebe o campo date, e inverte para depois conferir se é palindromo

    const dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' }); //Formata o campo na Timezone Brasileira

    const dataInvertida = dataFormatada.split('').reverse().join(''); // Qubra o campo Date informado para inverter e junta novamente. Exemplo 2023/01/12 -> 21/10/3202

    const DataFinal     = dataInvertida.toString().replace('/', '').replace('/', ''); // Remove os campos '/' da String para poder posteriormente comparar

        return DataFinal;
    }

  function FiltraDataNormal(data) { //Recebe o campo date para formatar e comparar posteriormente com a versão espelhada

    const dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' }); //Formata o campo na Timezone Brasileira

    const dataString = dataFormatada.split('').join(''); //Separa e une novamente o campo para gerar no mesmo formato da Função espelho. Métodos 'String' e '.ToString' retornaram valores diferentes

    const DataFinal     = dataString.toString().replace('/', '').replace('/', ''); // Remove os campos '/' da String para poder posteriormente comparar

        return DataFinal;
  }
  
  
  

// Confere se a data é de fato palindroma e busca dias após dia até achar a próxima a partir da data informada
function encontrarProximaDataPalindroma(data) {
    let Data = new Date(data);
    
    let DataInvertida = '';
    let DataAux = '';


    while(true){

        DataAux      = FiltraDataNormal(Data); //Formata data para comparação retornando campo String
        DataInvertida = verificarDataPalindroma(Data); //Formata e inverte data para comparação retornando campo String
        
        //Faz o teste lógico para identificar se é String, caso não seja incrementa mais um dia a data e tenta novamente
        if (DataInvertida === DataAux){
            break;
        } else {
            Data.setDate(Data.getDate() + 1);
        }
    }
    
    return Data; // Ao final retorna a Primeira data Palindroma encontrada a partir da data informada
}