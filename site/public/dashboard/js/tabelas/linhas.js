idEmpresa = sessionStorage.ID_EMPRESA;

function atualizarFeed() {
    fetch(`/empresas/listarMaquinaPorLinha`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("tabela_linhas");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                t_maquinas = 0 

                var feed = document.getElementById("tabela_linhas");
                feed.innerHTML = "";
                for (let i = 0; i < resposta.length; i++) {
                    var linha = resposta[i];

                    // Cria uma nova linha na tabela
                    var novaLinha = feed.insertRow();

                    // Cria células para cada coluna
                    var id = novaLinha.insertCell(0);
                    var numero = novaLinha.insertCell(1);
                    var nome = novaLinha.insertCell(2);
                    var qtd_maquinas = novaLinha.insertCell(3);


                    id.innerHTML = linha.id_linha;
                    numero.innerHTML = linha.numero_linha;
                    nome.innerHTML = linha.nome_linha;
                    qtd_maquinas.innerHTML = linha.quantidade_maquinas;
                    
                    
                    
                    t_maquinas += linha.quantidade_maquinas

                    total_maquinas.innerHTML = t_maquinas;
                    
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