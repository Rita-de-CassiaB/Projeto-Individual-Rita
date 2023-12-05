var processosModel = require("../models/processosModel");

function listarProcessos(req, res) {
    var idMaquina = req.params.idMaquina;
    var idEmpresa = req.params.idEmpresa;

    processosModel.listarProcessos(idEmpresa, idMaquina)
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


function listarJanelas(req, res) {
    var idMaquina = req.params.idMaquina;
    var idEmpresa = req.params.idEmpresa;

    processosModel.listarJanelas(idEmpresa, idMaquina)
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

function listarJanelasDistintas(req, res) {
    var idEmpresa = req.params.idEmpresa;

    processosModel.listarJanelasDistintas(idEmpresa)
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


function alterarJanela(req, res) {
    console.log("entrei validacao controller da janela")

    var codEmpresa = req.body.codEmpServer;
    var nome_janela = req.body.nome_janelaServer;
    var valor_negocio = req.body.valorNegocioServer;

    // Faça as validações dos valores
    // Faça as validações dos valores
    if (codEmpresa == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (nome_janela == undefined) {
        res.status(400).send("Seu CNPJ de senha está undefined!");
    } else if (valor_negocio == undefined) {
        res.status(400).send("Seu CNPJ de senha está undefined!");
    }
    else {
        processosModel.alterarJanela(codEmpresa, nome_janela, valor_negocio)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    listarProcessos,
    listarJanelas,
    listarJanelasDistintas,
    alterarJanela
}