// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

var vel_uplo_kpi = document.getElementById("vel_uplo_kpi");
var KPI_BYTE_RECEBIDOS = document.getElementById("vel_down_kpi");
var vel_down_kpi = document.getElementById("download_kpi");
var KPI_velocidade_upload = document.getElementById("velocidade_upload_kpi");
var KPI_PING = document.getElementById("ping_kpi");
var KPI_LAT = document.getElementById("lat_kpi");

var elemento_maquina = document.getElementById("select_maquina");
var idMaquina = elemento_maquina.value;

// window.onload = obterDadosRede(idMaquina);

function obterDadosRedeD(idMaquina) {
    console.log("REDE")
    // if (proximaAtualizacao != undefined) {
    //     clearTimeout(proximaAtualizacao);
    // }
    fetch(`/rede/ultimasREDE/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos DE REDE: ${JSON.stringify(resposta)}`);
          resposta.reverse();
  
          plotarGraficoRedeD(resposta, idMaquina);
  
        });
      } else {
        console.error('Nenhum dado encontrado ou erro na API');
      }
    })
      .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
  }
  
  function plotarGraficoRedeD(resposta, idMaquina) {
    console.log('Iniciando plotagem do gráfico...');
  
    // Criando estrutura para plotar gráfico - labels
    let labels = [];
  
    // Criando estrutura para plotar gráfico - dados
    let dados = {
      labels: labels,
      datasets: [{
        label: 'Megabytes Recebidos',
        data: [],
        backgroundColor: [],
        borderColor: ['#393d42'],
        tension: 0.1,
        fill: false,
        pointRadius: 6
      },
      {
        label: 'Velocidade Download',
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
    console.log('-------------------PLOT REDE velocidade download E Recebidos---------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)
  
    // Inserindo valores recebidos em estrutura para plotar o gráfico
  
  
    console.log('Dados recebidos pela função plotarGraficoRedeD:');
    console.log(resposta);
  
    // Inserindo valores recebidos em estrutura para plotar o gráfico
  
    for (let i = resposta.length - 1; i >= 0; i--) {
      var registro = resposta[i];
      dados.datasets[0].data.push(registro.recebidos || null);
      dados.datasets[1].data.push(registro.velocidade_download || null);
      labels.push(registro.data_hora);
  
  
      // Definindo a cor com base nas condições
      if (registro.recebidos < 7.67) {
        dados.datasets[0].backgroundColor.push('#000000');
      } else if (registro.recebidos <= 25.36) {
        dados.datasets[0].backgroundColor.push('#f6ff00');
      } else {
        dados.datasets[0].backgroundColor.push('#FF0000');
      }
  
      // Adicione uma verificação para a velocidade de download
      if (registro.velocidade_download !== null) {
        if (registro.velocidade_download < 81.05) {
          dados.datasets[1].backgroundColor.push('#00FF00');
        } else if (registro.velocidade_download <= 176.45) {
          dados.datasets[1].backgroundColor.push('#f6ff00');
        } else {
          dados.datasets[1].backgroundColor.push('#FF0000');
        }
  
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
    let chartRedeD = new Chart(
      document.getElementById(`myAreaChartRedeD`),
      config
    );
  
    setTimeout(() => atualizarGraficoRede(idMaquina, dados, chartRedeD), 10000);
  }
  
  
  function atualizarGraficoRede(idMaquina, dados, myAreaChartRedeD) {
  
    fetch(`/rede/tempo-realRede/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
        response.json().then(function (novoRegistro) {
  
          // obterDadosCPU(idMaquina);
          // // alertar(novoRegistro, idMaquina);
          // console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
          // console.log(`Dados atuais do gráfico:`);
          // console.log(dados);
  
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
            dados.datasets[0].data.push(novoRegistro[0].usado); // incluir uma nova medida
  
            dados.datasets[1].data.shift();  // apagar o primeira medida
            dados.datasets[1].data.push(novoRegistro[0].livre); // incluir uma nova medida
  
            if (novoRegistro.Recebidos != null) {
              KPI_BYTE_Recebidos.innerHTML = novoRegistro.Recebidos
            }
            if (novoRegistro.velocidade_download != null) {
              KPI_velocidade_download.innerHTML = novoRegistro.velocidade_download
            }
  
            chartRedeU.update();
          }
  
          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacaoRedeD = setTimeout(() => atualizarGraficoRede(idMaquina, dados, chartRedeD), 3000);
        });
      } else {
        console.error('Nenhum dado encontrado ou erro na API');
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacaoRedeD = setTimeout(() => atualizarGraficoRede(idMaquina, dados, chartRedeD), 3000);
      }
    })
      .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
  
  }
  
  function limparRede() {
    let chartRedeD = new Chart(
      document.getElementById(`myAreaChartRedeD`),
    );
  
    chartRedeD.clear()
  }