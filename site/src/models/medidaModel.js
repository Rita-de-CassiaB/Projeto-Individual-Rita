var database = require("../database/config");

function buscarUltimasMedidasDisco(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas} * from VW_DISCO_CHART
        where id_maquina = ${idMaquina};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_DISCO_CHART
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasRede(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas} * from VW_DISCO_CHART
        where id_maquina = ${idMaquina};
       `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_DISCO_CHART
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasCPU(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `  select top ${limite_linhas} * from VW_CPU_CHART
        where id_maquina = ${idMaquina};
       `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `  select * from VW_CPU_CHART
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMediasCPU(idLinha, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ` SELECT
        top ${limite_linhas} 
        AVG(dado_coletado) AS media_uso_cpu,
        data_hora
    FROM
        VW_CPU_CHART
    WHERE
        id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idLinha}
        )group by data_hora ORDER BY
        data_hora;
       `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` SELECT
        AVG(dado_coletado) AS media_uso_cpu,
        data_hora
    FROM
        VW_CPU_CHART
    WHERE
        id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idLinha}
        )group by data_hora ORDER BY
        data_hora DESC
         limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasRAM(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `  select top ${limite_linhas} from VW_RAM_CHART
        where id_maquina = ${idMaquina};
       `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `  select * from VW_RAM_CHART
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMediasRAM(idLinha, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `  SELECT top ${limite_linhas}
        AVG(usado) AS media_uso_ram,
        data_hora 
    FROM
        VW_RAM_CHART
    WHERE
        id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idLinha}
        ) group by data_hora;
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `  SELECT
        AVG(usado) AS media_uso_ram,
        data_hora 
    FROM
        VW_RAM_CHART
    WHERE
        id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idLinha}
        ) group by data_hora
       limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarUltimasMedidasTemp(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `  select top ${limite_linhas} * from VW_TEMP_CHART
        where id_maquina = ${idMaquina};
       `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `  select * from VW_TEMP_CHART
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealTemp(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1 * from VW_TEMP_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_TEMP_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasBoot(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `  select top ${limite_linhas} data_hora_inicializacao from maquina where id_maquina= ${idMaquina};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `  select data_hora_inicializacao from maquina where id_maquina= ${idMaquina}
        limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealBoot(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `  select data_hora_inicializacao from maquina where id_maquina= ${idMaquina}`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `  select data_hora_inicializacao from maquina where id_maquina= ${idMaquina}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasRede(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas} * from VW_REDE_CHART
        where id_maquina = ${idMaquina};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_REDE_CHART
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasDesempenho(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas} * from VW_DESEMPENHO_CHART
        where id_maquina = ${idMaquina};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_DESEMPENHO_CHART
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasDesempenhoTemp(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas} * from VW_DESEMPENHO_CHART_TEMP
        where id_maquina = ${idMaquina};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_DESEMPENHO_CHART_TEMP
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasDesempenhoMedia(idLinha) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ` SELECT top ${limite_linhas} *
        FROM VW_DESEMPENHO_CHART_MEDIA
        WHERE id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idLinha} 
         );
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT *
        FROM VW_DESEMPENHO_CHART_MEDIA
        WHERE id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idLinha} 
         );`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealDesempenhoTemp(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 3 * from VW_DESEMPENHO_CHART_TEMP
        where id_maquina = ${idMaquina}
        ORDER BY data_hora;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_DESEMPENHO_CHART_TEMP
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 3`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function buscarUltimasJanelas(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from VW_JANELAS_CHART
        where fk_maquinaJ = ${idMaquina};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_JANELAS_CHART
                    where fk_maquinaJ = ${idMaquina};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealCPU(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1 * from VW_CPU_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_CPU_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMediaEmTempoCPU(idLinha) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT top
        AVG(dado_coletado) AS media_uso_cpu,
        data_hora
    FROM
        VW_CPU_CHART
    WHERE
        id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idLinha}
        )group by data_hora ORDER BY
        data_hora;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        AVG(dado_coletado) AS media_uso_cpu,
        data_hora
    FROM
        VW_CPU_CHART
    WHERE
        id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idLinha}
        )group by data_hora ORDER BY
        data_hora DESC;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMediaEmTempoRAM(idLinha) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ` SELECT
        AVG(usado) AS media_uso_ram,
        data_hora 
    FROM
        VW_RAM_CHART
    WHERE
        id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idLinha}
        ) group by data_hora;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` SELECT
        AVG(usado) AS media_uso_ram,
        data_hora 
    FROM
        VW_RAM_CHART
    WHERE
        id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idLinha}
        ) group by data_hora;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealRAM(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1 * from VW_RAM_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_RAM_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealDesempenho(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 3 * from VW_DESEMPENHO_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_DESEMPENHO_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 3`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMediasEmTempoRealDesempenho(idLinha) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT top 2 *
        FROM VW_DESEMPENHO_CHART_MEDIA
        WHERE id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idLinha} 
         ) ;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT *
        FROM VW_DESEMPENHO_CHART_MEDIA
        WHERE id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idLinha} 
         ) limit 2;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMedidasEmTempoRealRede(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1 * from VW_REDE_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_REDE_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealDisco(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1 * from VW_DISCO_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_DISCO_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function buscarUltimasMedidasTempXCpu(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas} * from VW_CPU_KOTLIN_CHART
        where id_maquina = ${idMaquina};
       `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_CPU_KOTLIN_CHART
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMedidasEmTempoRealTempXCpu(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1 * from VW_CPU_KOTLIN_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_CPU_KOTLIN_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarMedidasEmTempoRealCPU,
    buscarMedidasEmTempoRealRAM,
    buscarMedidasEmTempoRealDesempenho,
    buscarMedidasEmTempoRealDisco,
    buscarMedidasEmTempoRealRede,
    buscarUltimasMedidasCPU,
    buscarUltimasMedidasRAM,
    buscarUltimasMedidasDisco,
    buscarUltimasMedidasRede,
    buscarUltimasMedidasDesempenho,
    buscarUltimasJanelas, 
    buscarUltimasMedidasTemp, 
    buscarMedidasEmTempoRealTemp, 
    buscarUltimasMedidasTempXCpu, 
    buscarMedidasEmTempoRealTempXCpu, 
    buscarUltimasMedidasDesempenhoTemp, 
    buscarMedidasEmTempoRealDesempenhoTemp,
    buscarUltimasMedidasBoot,
    buscarMedidasEmTempoRealBoot,
    buscarMediaEmTempoCPU,
    buscarMediaEmTempoRAM,
    buscarMediasEmTempoRealDesempenho,
    buscarUltimasMediasRAM,
    buscarUltimasMediasCPU,
    buscarUltimasMedidasDesempenhoMedia,
}



/*


        # CPU
        cpu_percentual = processador
        print("Verificando condições de alerta CPU")
        print("Valor atual de cpu_percentual:", cpu_percentual)
        if cpu_percentual > 0 and cpu_percentual < 4:
            print("Condição de alerta CPU atendida (Risco)")
            mensagem_cpu1 = {"text": f"⚠ Alerta de Risco na CPU da máquina {id_maquina}!"}
            response = requests.post(webhook_url, data=json.dumps(mensagem_cpu1), headers=headers)
            print("Resposta da API do Slack:", response.text)
        elif cpu_percentual > 5:
            print("Condição de alerta CPU atendida (Perigo)")
            mensagem_cpu2 = {"text": f"☠️ Alerta de Perigo na CPU da máquina {id_maquina}!"}
            response = requests.post(webhook_url, data=json.dumps(mensagem_cpu2), headers=headers)
            print("Resposta da API do Slack:", response.status_code)
            print("Conteúdo da resposta:", response.text)
        else:
            print("Nenhuma condição de alerta CPU atendida")

        # Componente Disco
        disco_livre = disco.free
        disco_total = disco.total
        conta_disco_livre = (disco_livre / disco.total) * 100
        conta_disco_usado = 100 - conta_disco_livre
        print("Verificando condições de alerta Disco")
        print("Valor atual de disco_usado:", round(conta_disco_usado, 2))
        if round(conta_disco_usado, 2) > 20 and round(conta_disco_usado, 2) < 60:
            mensagem_disco1 = {"text": f"⚠ Alerta de Risco no Disco da máquina {id_maquina}!"}
            response = requests.post(webhook_url, data=json.dumps(mensagem_disco1), headers=headers)
            print("Resposta da API do Slack:", response.text)
        elif round(conta_disco_usado, 2) > 60:
            mensagem_disco2 = {"text": f"☠️ Alerta de Perigo no Disco da máquina {id_maquina}, há muito pouco espaço!"}
            response = requests.post(webhook_url, data=json.dumps(mensagem_disco2), headers=headers)
            print("Resposta da API do Slack:", response.text)
        else:
            print("Nenhuma condição de alerta Disco atendida")*/