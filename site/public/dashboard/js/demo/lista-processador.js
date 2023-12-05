idEmpresa = sessionStorage.ID_EMPRESA;

function listarProcessador(idmaquina) {
    fetch(`/processador/lista/${idmaquina}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("tabela_titulo_maquina");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                t_maquinas = 0 

                var feed = document.getElementById("tabela_processador");
                feed.innerHTML = "";
                for (let i = 0; i < resposta.length; i++) {
                    var linha = resposta[i];

                    // Cria uma nova linha na tabela
                    var novaLinha = feed.insertRow();

                    // Cria células para cada coluna
                    var identificador = novaLinha.insertCell(0);
                    var fabricante = novaLinha.insertCell(1);
                    var microarquitetura = novaLinha.insertCell(2);
                    var fk_maquina_especificacao = novaLinha.insertCell(3);
                    var fk_empresa_especificacao = novaLinha.insertCell(4);


                    identificador.innerHTML = linha.identificador;
                    fabricante.innerHTML = linha.fabricante;
                    microarquitetura.innerHTML = linha.microarquitetura;
                    fk_maquina_especificacao.innerHTML = linha.fk_maquina_especificacao;
                    fk_empresa_especificacao.innerHTML = linha.fk_empresa_especificacao;
                    
                }

               // finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        tabela_titulo_maquina.innerHTML = "Você não tem nenhuma maquina cadastrada..."
    });
}