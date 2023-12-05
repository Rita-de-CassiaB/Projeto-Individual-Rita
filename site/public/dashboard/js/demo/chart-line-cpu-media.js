// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example    
// var ctx = document.getElementById("myAreaChartCPU");

// window.onload = obterDadosCPU(idMaquina);

function obterDadosMediaCPU(idLinha) {
  console.log("CPU")
  // if (proximaAtualizacao != undefined) {
  //     clearTimeout(proximaAtualizacao);
  // }

  fetch(`/medidas/ultimasMediasCPU/${idLinha}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
          response.json().then(function (resposta) {
              console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
              resposta.reverse();

              plotarGraficoCPU(resposta, idLinha);

          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
}

function plotarGraficoCPU(resposta, idLinha) {

    console.log('iniciando plotagem do gráfico...');
  
    // Criando estrutura para plotar gráfico - labels
    let labels = [];
  
    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Usada',
            data: [],
            backgroundColor: [],
            borderColor: ['#393d42'],
            tension: 0.3,
            fill: false, 
            pointRadius: 6
        }]
    };
  
    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)
    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = resposta.length - 1; i >= 0; i--) {
      var registro = resposta[i];
      dados.datasets[0].data.push(registro.media_uso_cpu);
      labels.push(registro.data_hora);
  
      // Definindo a cor com base nas condições
      if (registro.media_uso_cpu <= 7) {
        dados.datasets[0].backgroundColor.push('#00FF00');
        // dados.datasets[0].borderColor.push('#00FF00');
      } else if (registro.media_uso_cpu <= 10) {
        dados.datasets[0].backgroundColor.push('#f6ff00');
        // dados.datasets[0].borderColor.push('#f6ff00');
      } else {
        dados.datasets[0].backgroundColor.push('#FF0000');
        // dados.datasets[0].borderColor.push('#FF0000');
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
      fill: false,
    }
  
    // Adicionando gráfico criado em div na tela
    let chartMediaCPU = new Chart(
      document.getElementById(`myAreaChartCPUMedia`),
      config
    );
  
    setTimeout(() => atualizarGraficoMediaCPU(idLinha, dados, chartMediaCPU), 5000);
  }
  
  

function atualizarGraficoMediaCPU(idLinha, dados, chartMediaCPU) {

    fetch(`/medidas/tempo-realMediaCPU/${idLinha}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                // obterDadosCPU(idMaquina);
                // // alertar(novoRegistro, idMaquina);
                // console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                // console.log(`Dados atuais do gráfico:`);
                // console.log(dados);

                if (novoRegistro[0].data_hora == dados.datasets[0].data.data_hora) {
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
                    dados.datasets[0].data.push(novoRegistro[0].media_uso_cpu); // incluir uma nova medida

                    chartMediaCPU.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoMediaCPU(idLinha, dados, chartMediaCPU), 5000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoMediaCPU(idLinha, dados, chartMediaCPU), 5000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function limparCPU(){
    let chartMediaCPU = new Chart(
        document.getElementById(`myAreaChartCPUMedia`),
    );

    chartMediaCPU.clear()
}