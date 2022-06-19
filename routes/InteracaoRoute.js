const interacaoController = require('../controllers/InteracaoController');
const express = require('express');
const router = express.Router();

router.post('/', interacaoController.salvar);
router.get('/cliente/:idCliente', interacaoController.listar);
router.get('/:id', interacaoController.buscarPorId);
router.put('/:id', interacaoController.atualizar);
router.delete('/:id', interacaoController.excluir);

module.exports = router;
