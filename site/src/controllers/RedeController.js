var redeModel = require("../models/redeModel");


function buscarUltimasMedidasRede(req, res) {

    const limite_linhas = 9;

    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    redeModel.buscarUltimasMedidasRede(idMaquina, limite_linhas).then(function (resultado) {
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

function buscarMedidasEmTempoRealRede(req, res) {
    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando medidas em tempo real`);

    redeModel.buscarMedidasEmTempoRealRede(idMaquina).then(function (resultado) {
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



function buscarUltimasMedidasRedeP(req, res) {

    const limite_linhas = 7;

    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    redeModel.buscarUltimasMedidasRede(idMaquina, limite_linhas).then(function (resultado) {
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

function buscarMedidasEmTempoRealRedeP(req, res) {
    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando medidas em tempo real`);

    redeModel.buscarMedidasEmTempoRealRede(idMaquina).then(function (resultado) {
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


function buscarUltimasMedidasDesempenhoRede(req, res) {

    const limite_linhas = 5;

    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    redeModel.buscarUltimasMedidasDesempenhoRede(idMaquina, limite_linhas).then(function (resultado) {
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

function buscarMedidasEmTempoRealDesempenhoRede(req, res) {
    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando medidas em tempo real`);

    redeModel.buscarMedidasEmTempoRealDesempenhoRede(idMaquina).then(function (resultado) {
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

// Gráfico de Pizza Rede e Processos

function buscarUltimasMedidasRedeProcessos(req, res) {

    const limite_linhas = 7;

    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    redeModel.buscarUltimasMedidasRedeProcessos(idMaquina, limite_linhas).then(function (resultado) {
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

function buscarMedidasEmTempoRealRedeProcessos(req, res) {
    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando medidas em tempo real`);

    redeModel.buscarMedidasEmTempoRealRedeProcessos(idMaquina).then(function (resultado) {
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

function listarProcessosRede(req, res) {
    var idMaquina = req.params.idMaquina;
    var idEmpresa = req.params.idEmpresa;

    redeModel.listarProcessosRede(idMaquina, idEmpresa)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    buscarMedidasEmTempoRealRede,
    buscarUltimasMedidasRede,
    buscarMedidasEmTempoRealRedeP,
    buscarUltimasMedidasRedeP,
    buscarUltimasMedidasDesempenhoRede,
    buscarMedidasEmTempoRealDesempenhoRede,
    buscarUltimasMedidasRedeProcessos,
    buscarMedidasEmTempoRealRedeProcessos,
    listarProcessosRede
}