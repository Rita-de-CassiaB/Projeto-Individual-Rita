var express = require("express");
var router = express.Router();

var RedeController = require("../controllers/RedeController");


router.get("/ultimasREDE/:idMaquina", function (req, res) {
    RedeController.buscarUltimasMedidasRede(req, res);
});

router.get("/tempo-realRede/:idMaquina", function (req, res) {
    RedeController.buscarMedidasEmTempoRealRede(req, res);
})

router.get("/ultimasREDEP/:idMaquina", function (req, res) {
    RedeController.buscarUltimasMedidasRedeP(req, res);
});

router.get("/tempo-realRedeP/:idMaquina", function (req, res) {
    RedeController.buscarMedidasEmTempoRealRedeP(req, res);
})

router.get("/ultimasDesempenho/:idMaquina", function (req, res) {
    RedeController.buscarUltimasMedidasDesempenhoR(req, res);
});

router.get("/tempo-realDesempenho/:idMaquina", function (req, res) {
    RedeController.buscarMedidasEmTempoRealDesempenhoR(req, res);
})

router.get("/ultimasRedeProcessos/:idMaquina", function (req, res) {
    RedeController.buscarUltimasMedidasRedeProcessos(req, res);
});

router.get("/tempo-realRedeProcessos/:idMaquina", function (req, res) {
    RedeController.buscarMedidasEmTempoRealRedeProcessos(req, res);
})

router.get("/listar/:idEmpresa/:idMaquina", function (req, res) {
    processosController.listarProcessos(req, res);
});


module.exports = router;