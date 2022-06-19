const condicaoPagamentoController = require('../controllers/CondicaoPagamentoController');
const express = require('express');
const router = express.Router();

router.post('/', condicaoPagamentoController.salvar);
router.get('/', condicaoPagamentoController.listar);
router.get('/:id', condicaoPagamentoController.buscarPorId);
router.put('/:id', condicaoPagamentoController.atualizar);
router.delete('/:id', condicaoPagamentoController.excluir);

module.exports = router;
