var medidaModel = require("../models/processadorModel");

function buscarUltimasMedidasProcessadorTemp(req, res) {

    const limite_linhas = 7;

    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidasProcessadorTemp(idMaquina, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimasMedidasFrequencia(req, res) {

    const limite_linhas = 7;

    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidasFrequencia(idMaquina, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarUltimasCpuporProcessos(req, res) {

    const limite_linhas = 7;

    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasCpuporProcessos(idMaquina, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarProcessador(req, res) {

    const limite_linhas = 7;

    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.listarProcessador(idMaquina, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimasDiscoporProcessos(req, res) {

    const limite_linhas = 7;

    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasDiscoporProcessos(idMaquina, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// KPI USO PROCESSADOR MARCOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSZ
function buscarMaiorUso(req, res) {

    const limite_linhas = 1;

    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarMaiorUso(idMaquina, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasMedidasProcessadorTemp,
    buscarUltimasMedidasFrequencia,
    buscarUltimasCpuporProcessos,
    buscarUltimasDiscoporProcessos, 
    buscarMaiorUso,
    listarProcessador
}