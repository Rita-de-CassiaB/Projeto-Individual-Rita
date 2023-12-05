var express = require("express");
var router = express.Router();

var processadorController = require("../controllers/processadorController");


router.get("/ultimasCPU/:idMaquina", function (req, res) {
    processadorController.buscarUltimasMedidasProcessadorTemp(req, res);
});

router.get("/ultimasRAM/:idMaquina", function (req, res) {
    processadorController.buscarUltimasMedidasFrequencia(req, res);
});

router.get("/kpiUsoProcessador/:idMaquina", function (req, res) {
    processadorController.buscarMaiorUso(req, res);
});

router.get("/cpuporprocesso/:idMaquina", function (req, res) {
    processadorController.buscarUltimasCpuporProcessos(req, res);
});

router.get("/cpupordisco/:idMaquina", function (req, res) {
    processadorController.buscarUltimasDiscoporProcessos(req, res);
});

router.get("/lista/:idMaquina", function (req, res) {
    processadorController.listarProcessador(req, res);
});

module.exports = router;