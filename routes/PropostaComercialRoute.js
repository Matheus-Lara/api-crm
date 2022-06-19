const propostaComercialController = require('../controllers/PropostaComercialController');
const express = require('express');
const router = express.Router();

router.post('/', propostaComercialController.salvar);
router.get('/', propostaComercialController.listar);
router.get('/:id', propostaComercialController.buscarPorId);
router.put('/:id', propostaComercialController.atualizar);
router.delete('/:id', propostaComercialController.excluir);

module.exports = router;
