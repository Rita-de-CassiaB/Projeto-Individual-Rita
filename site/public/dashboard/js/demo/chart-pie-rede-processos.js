// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example    
var ctx = document.getElementById("myPieChartRPE");


function obterDadosRPE(idMaquina) {

  // console.log("Rede e processos!")
  //  if (proximaAtualizacao != undefined) {
  //      clearTimeout(proximaAtualizacao);
  //  }

  fetch(`/rede/ultimasRedeProcessos/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        resposta.reverse();

        plotarGraficoRPE(resposta, idMaquina);

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGraficoRPE(resposta, idMaquina) {

  console.log('iniciando plotagem do gráfico...');
      // Criando estrutura para plotar gráfico - labels
      let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
    labels: labels,
    datasets: [{
      label: 'Bytes Enviados',
      data: [],
      backgroundColor: [      
      '#2510a3', 'rgb(54, 162, 235)', 
      '#338dff', '#191970' , '#6495ED', '#483D8B',
      '#000080' , '#4169E1', '#4682B4', '#87CEFA' ],
      borderColor: [],
      tension: 0.1,
      hoverOffset: 4
    }]
  };

  console.log('----------------------------------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)


  // Inserindo valores recebidos em estrutura para plotar o gráfico
  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    dados.datasets[0].data.push(registro.bytes_enviados);
    labels.push(registro.nome_processo);
    
  }

  console.log('----------------------------------------------')
  console.log('O gráfico será plotado com os respectivos valores:')
  console.log('Labels:')
  console.log(labels)
  console.log('Dados:')
  console.log(dados.datasets)
  console.log('----------------------------------------------')

  // Criando estrutura para plotar gráfico - config
  const config = {
    type: 'doughnut',
    data: dados
  };

  const options = {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 50, // Experimente ajustar esse valor conforme necessário
  }
  
  // Adicionando gráfico criado em div na tela
  let chartRPE = new Chart(
    document.getElementById(`myPieChartRPE`),
    config,
    options
  );

  setTimeout(() => atualizarGraficoRPE(idMaquina, dados, chartRPE), 5000);
}


function atualizarGraficoRPE(idMaquina, dados, chartRPE) {

  fetch(`/rede/tempo-realRedeProcessos/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (novoRegistro) {

        // obterDadosCPU(idMaquina);
        // alertar(novoRegistro, idMaquina);
        console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
        console.log(`Dados atuais do gráfico:`);
        console.log(dados);
        console.log(novoRegistro)

        if ((novoRegistro[0].nome_processo == dados.labels[dados.labels.length - 1])) {
          console.log("---------------------------------------------------------------")
          console.log("Como não houve mudança de bytes em processos, o gráfico não atualizará.")
          // avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
          console.log("Horário do novo dado capturado:")
          console.log(novoRegistro[0].nome_processo)
          console.log("Horário do último dado capturado:")
          console.log(dados.labels[dados.labels.length - 1])
          console.log("---------------------------------------------------------------")
        } else {
          dados.datasets[0].data.pop();

          dados.datasets[0].data.push(novoRegistro[0].nome_processo); // incluir uma nova medida

          chartRPE.update();
        }

        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacaoRPE = setTimeout(() => atualizarGraficoRPE(idMaquina, dados, chartRPE), 5000);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
      proximaAtualizacaoRPE = setTimeout(() => atualizarGraficoRPE(idMaquina, dados, chartRPE), 5000);
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

function limparRPE(){
  let chartRPE = new Chart(
      document.getElementById(`myPieChartRPE`),
  );

  chartRPE.clear()
}


// Gráfico 2 -- Bytes Recebidos -----------------------------------------------------------------------------------------------------------------------------

function obterDadosRPR(idMaquina) {
  console.log("Rede e processos!")
  // if (proximaAtualizacao != undefined) {
  //     clearTimeout(proximaAtualizacao);
  // }

  fetch(`/rede/ultimasRedeProcessos/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        resposta.reverse();

        plotarGraficoRPR(resposta, idMaquina);

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGraficoRPR(resposta, idMaquina) {

  console.log('iniciando plotagem do gráfico...');
      // Criando estrutura para plotar gráfico - labels
      let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
    labels: labels,
    datasets: [{
      label: 'Bytes Recebidos',
      data: [],
      backgroundColor: [      
      '#7B68EE', '#4B0082', '#8A2BE2',
      '#9370DB', '#9932CC', '#A020F0',
      '#DA70D6', '#8B008B', '#6A5ACD',	'	#483D8B' ],
      borderColor: [],
      tension: 0.1,
      hoverOffset: 4
    }]
  };

  console.log('----------------------------------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)


  // Inserindo valores recebidos em estrutura para plotar o gráfico
  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    dados.datasets[0].data.push(registro.bytes_recebidos);
    labels.push(registro.nome_processo);
    
  }

  console.log('----------------------------------------------')
  console.log('O gráfico será plotado com os respectivos valores:')
  console.log('Labels:')
  console.log(labels)
  console.log('Dados:')
  console.log(dados.datasets)
  console.log('----------------------------------------------')

  // Criando estrutura para plotar gráfico - config
  const config = {
    type: 'doughnut',
    data: dados
  };

  const options = {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 50, // Experimente ajustar esse valor conforme necessário
  }
  
  // Adicionando gráfico criado em div na tela
  let chartRPR = new Chart(
    document.getElementById(`myPieChartRPR`),
    config,
    options
  );

  setTimeout(() => atualizarGraficoRPR(idMaquina, dados, chartRPR), 5000);
}


function atualizarGraficoRPR(idMaquina, dados, chartRPR) {

  fetch(`/rede/tempo-realRedeProcessos/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (novoRegistro) {

        // obterDadosCPU(idMaquina);
        // alertar(novoRegistro, idMaquina);
        console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
        console.log(`Dados atuais do gráfico:`);
        console.log(dados);
        console.log(novoRegistro)

        if ((novoRegistro[0].bytes_recebidos== dados.labels[dados.labels.length - 1])) {
          console.log("---------------------------------------------------------------")
          console.log("Como não houve mudança de bytes em processos, o gráfico não atualizará.")
          // avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
          console.log("Horário do novo dado capturado:")
          console.log(novoRegistro[0].nome_processo)
          console.log("Horário do último dado capturado:")
          console.log(dados.labels[dados.labels.length - 1])
          console.log("---------------------------------------------------------------")
        } else {
          dados.datasets[0].data.pop();

          dados.datasets[0].data.push(novoRegistro[0].bytes_recebidos); // incluir uma nova medida

          chartRPR.update();
        }

        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacaoRPR = setTimeout(() => atualizarGraficoRPR(idMaquina, dados, chartRPR), 5000);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
      proximaAtualizacaoRPR = setTimeout(() => atualizarGraficoRPR(idMaquina, dados, chartRPR), 5000);
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

function limparRPR(){
  let chartRPE = new Chart(
      document.getElementById(`myPieChartRPR`),
  );

  chartRPE.clear()
}