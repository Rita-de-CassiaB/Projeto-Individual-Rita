// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// VAR PARA KPI
var KPI_PING = document.getElementById("ping_kpi");
var KPI_LAT = document.getElementById("lat_kpi");

// VAR PARA MUDAR O VALOR DO DESEMPENHO
var ping = document.getElementById("ping");
var lat = document.getElementById("lat");

// VAR PARA MUDAR O TAMANHO DA BARRA DE PROGRESSO
var ping_bar = document.getElementById("bar_ping");
var lat_bar = document.getElementById("bar_lat");

var elemento_maquina = document.getElementById("select_maquina");
var idMaquina = elemento_maquina.value;

// window.onload = obterDadosRede(idMaquina);

function obterDadosRedeO(idMaquina) {
  console.log("REDE")
  // if (proximaAtualizacao != undefined) {
  //     clearTimeout(proximaAtualizacao);
  // }

  valores_kpi_desempenho = [KPI_LAT, KPI_PING]
  valores = [ping, lat]
  valores_Bar = [ping_bar, lat_bar]

  fetch(`/rede/ultimasREDE/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos DE REDE: ${JSON.stringify(resposta)}`);
        resposta.reverse();

        plotarGraficoRedeO(resposta, idMaquina);

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGraficoRedeO(resposta, idMaquina) {
  console.log('Iniciando plotagem do gráfico...');

  // Criando estrutura para plotar gráfico - labels
  let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
    labels: labels,
    datasets: [{
      label: 'Status da Rede',
      data: [],
      backgroundColor: [],
      borderColor: ['#393d42'],
      tension: 0.1,
      fill: false,
      pointRadius: 6
    },
    {
      label: 'Latência',
      data: [],
      backgroundColor: [],
      borderColor: ['#c6c6c6'],
      tension: 0.1,
      fill: false,
      pointRadius: 6
    },
    ]
  };

  console.log('--------------------------------------------------------------------')
  console.log('-------------------PLOT REDE Status e Latênci---------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)

  // Inserindo valores recebidos em estrutura para plotar o gráfico


  console.log('Dados recebidos pela função plotarGraficoRedeO:');
  console.log(resposta);

  // Inserindo valores recebidos em estrutura para plotar o gráfico

  for (let i = resposta.length - 1; i >= 0; i--) {
    var registro = resposta[i];
    dados.datasets[0].data.push(registro.ping);
    dados.datasets[1].data.push(registro.latencia);
    labels.push(registro.data_hora);

    if (registro.recurso === "ping") {
      valores[0].innerHTML = (registro.uso) + "%";
      valores_Bar[0].style.width = (registro.uso) + "%";
      valores_kpi_desempenho[0].innerHTML = (registro.uso) + "%";
  }
  if (registro.recurso === "latencia") {
      valores[1].innerHTML = (registro.uso) + "%";
      valores_Bar[1].style.width = (registro.uso) + "%";
      valores_kpi_desempenho[1].innerHTML = (registro.uso) + "%";
  }

    // Definindo a cor com base nas condições
    if (registro.enviados < 7.67) {
      dados.datasets[0].backgroundColor.push('#00FF00');
    } else if (registro.enviados <= 25.36) {
      dados.datasets[0].backgroundColor.push('#f6ff00');
    } else {
      dados.datasets[0].backgroundColor.push('#FF0000');
    }

    // Adicione uma verificação para a velocidade de upload
    if (registro.velocidade_upload !== null) {
      if (registro.velocidade_upload < 81.05) {
        dados.datasets[1].backgroundColor.push('#00FF00');
      } else if (registro.velocidade_upload <= 176.45) {
        dados.datasets[1].backgroundColor.push('#f6ff00');
      } else {
        dados.datasets[1].backgroundColor.push('#FF0000');
      }

      // if (i == (resposta.length - 1)) {
      //   KPI_BYTE_ENVIADOS.innerHTML = registro.enviados
      // }
      
    } else {
      // Adicione um valor padrão ou lógica para lidar com dados de velocidade de upload nulos
      dados.datasets[1].backgroundColor.push('#CCCCCC'); // Cor padrão para nulos
    }
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
    type: 'line',
    data: dados,
    options: {
      scales: {
        y: {
          beginAtZero: false // Define para não começar em zero
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    },
    fill: false
  }

  // Adicionando gráfico criado em div na tela
  let chartRedeO = new Chart(
    document.getElementById(`myAreaChartRedeO`),
    config
  );

  setTimeout(() => atualizarGraficoRede(idMaquina, dados, chartRedeO), 10000);
}


function atualizarGraficoRede(idMaquina, dados, chartRedeO) {

  fetch(`/rede/tempo-realRede/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (novoRegistro) {

        obterDadosRedeU(idMaquina);
        // alertar(novoRegistro, idMaquina);
        console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
        console.log(`Dados atuais do gráfico:`);
        console.log(dados);

        if (novoRegistro[0].data_hora == dados.labels[dados.labels.length - 1]) {
          console.log("---------------------------------------------------------------")
          console.log("Como não há dados novos para captura, o gráfico não atualizará.")
          // avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
          console.log("Horário do novo dado capturado:")
          console.log(novoRegistro[0].data_hora)
          console.log("Horário do último dado capturado:")
          console.log(dados.labels[dados.labels.length - 1])
          console.log("---------------------------------------------------------------")
        } else {
          // tirando e colocando valores no gráfico
          dados.labels.shift(); // apagar o primeiro
          dados.labels.push(novoRegistro[0].data_hora); // incluir um novo momento

          dados.datasets[0].data.shift();  // apagar o primeira medida
          dados.datasets[0].data.push(novoRegistro[0].ping); // incluir uma nova medida

          dados.datasets[1].data.shift();  // apagar o primeira medida
          dados.datasets[1].data.push(novoRegistro[0].latencia); // incluir uma nova medida
          

          if (novoRegistro.ping != null) {
            KPI_PING.innerHTML = novoRegistro.ping
          }
          if (novoRegistro.latencia != null) {
            KPI_LAT.innerHTML = novoRegistro.latencia
          }

          chartRedeO.update();
        }

        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacaoRedeO = setTimeout(() => atualizarGraficoRede(idMaquina, dados, chartRedeO), 10000);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
      proximaAtualizacaoRedeO = setTimeout(() => atualizarGraficoRede(idMaquina, dados, chartRedeO), 10000);
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

function limparRede() {
  let chartRedeO = new Chart(
    document.getElementById(`myAreaChartRedeO`),
  );

  chartRedeO.clear()
}

